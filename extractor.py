from bs4 import BeautifulSoup, Tag
import re
import pandas as pd
import datetime

SA_HTML_FILE = 'solver_example.html'

USER_ID_RE = re.compile(r'u([0-9]+)')
SHIFT_ID_RE = re.compile(r'sh([0-9]+)')
MONTH_YEAR_RE = re.compile(r'([a-zA-Z]+) ([0-9]+)')

def process_shift_row(sr : Tag):
    '''General format:
    <tr class="shiftRow">
        <td>
            <strong>SITE_NAME</strong>
            <span>SHIFT_NAME</span>
        </td>
        <td>
            <div class="divShift uUSER_ID shSHIFT_ID">
                <span class="spanShift">USER_NAME</span>
            </div>
        </td>
    </tr>
    '''
    tds = sr.find_all('td')

    site_name = tds[0].strong.string
    shift_name = tds[0].span.string

    spanShift = tds[1].find_all(class_='spanShift')[0]
    user_name = spanShift.string

    user_id_shift_id = ' '.join(spanShift.parent['class'])
    user_id = int(USER_ID_RE.search(user_id_shift_id)[1])
    shift_id = int(SHIFT_ID_RE.search(user_id_shift_id)[1])

    # Go up the hierarchy until we find the <td> with calendar-normal class
    day_number = None
    for t in sr.parents:
        if 'class' in t.attrs:
            if 'calendar-normal' in t['class']:
                # print(t)
                day_number = t.find(class_='dayNumber').contents[0]
                break

    # Go up the hierarchy until we find the month
    # this is not efficient but it does the job
    month_name = None
    year = None
    for t in sr.parents:
        if 'class' in t.attrs:
            if 'calendar' in t['class']:
                search_res = MONTH_YEAR_RE.search(t.tbody.tr.td.contents[0])
                month_name = search_res[1]
                year = int(search_res[2])
                break
    
    shift_date = datetime.datetime.strptime(f'{month_name} {day_number} {year}', '%B %d %Y').date()

    return {
        'shiftDate': shift_date,
        'monthName': month_name,
        'year': year,
        'dayNumber': day_number,
        'siteName': site_name,
        'shiftId': shift_id,
        'shiftName': shift_name,
        'userId': user_id,
        'userName': user_name
    }

def main():
    with open(SA_HTML_FILE) as fp:
        soup = BeautifulSoup(fp, features="html.parser")
    print(f'Parsed {SA_HTML_FILE}')

    # get all the shift rows
    shift_rows = soup.find_all("tr", class_='shiftRow')
    # filter out the ones that are cover violations and don't contain actual users
    shift_rows = [sr for sr in shift_rows if not ('CoverViolationInline' in sr['class'])]

    # for sr in shift_rows:
    #     print(process_shift_row(sr))
    shifts = [process_shift_row(sr) for sr in shift_rows]  
    # print(shifts)  
    shifts = pd.DataFrame(shifts)
    print(shifts)
    shifts = shifts[['shiftDate','shiftName','userName','userId']]
    shiftsp = (shifts.pivot(columns='shiftDate', index=['userName','userId'], values='shiftName')
                     .fillna('')
                     .sort_index(axis=1)
                     .sort_index(axis=0)
    )
    print(shiftsp)
    shiftsp.to_csv('output.csv')

if __name__ == '__main__':
    main()