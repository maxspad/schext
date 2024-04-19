import streamlit as st
import extractor as ext
from thefuzz import fuzz
import numpy as np
import pandas as pd 

@st.cache_data
def get_soup(f):
    return ext.make_soup(f)

@st.cache_data
def get_csv_output(df : pd.DataFrame) -> str:
    return df.to_csv().encode('utf-8')


st.title('ShiftAdmin Generation Extractor')
st.markdown('''This app makes it easier to convert ShiftAdmin generation results into
            a spreadsheet format for manual review and editing. ''')
with st.expander('Instructions for use:'):
    st.markdown('''This tool only works with the ShiftAdmin *generated schedule* page.
                First, go to the generated schedule and download the webpage as an HTML file:''')
    st.image('static/how_to_download_webpage.gif')
    st.markdown('''Then, upload below:''')
    st.image('static/how_to_upload_webpage.gif')
    st.markdown('''The table will automatically generate after a few moments. 
                You can copy and paste the table into a spreadsheet 
                or download it using the button at the bottom.''')

f = st.file_uploader('Website Download of ShiftAdmin Results Page:', type='html')
# use_custom_sort = st.toggle('Use custom sort order', value=True)
# if use_custom_sort:
#     sheet_names = st.text_area("Your list of resident names from your spreadsheet, separated by newlines:")
#     sheet_names = sheet_names.lower().split('\n')

if f is None:
    st.stop()

soup = get_soup(f)
shiftsp = ext.extract_calendar(soup).reset_index()

# if use_custom_sort:
#     new_order = [
#         np.argmax([fuzz.ratio(user_name, sn) for sn in sheet_names])
#         for user_name in shiftsp['userName']
#     ]

#     shiftsp['newOrder'] = new_order
#     shiftsp = shiftsp.sort_values('newOrder')
# else:
shiftsp = shiftsp.sort_values('userId')

st.dataframe(shiftsp, hide_index=True)

csv = get_csv_output(shiftsp)
st.download_button('Download as CSV', csv, file_name='shiftadmin_extraction.csv', mime='text/csv')
# st.dataframe(shiftsp)
