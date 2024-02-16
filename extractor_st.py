import streamlit as st
import extractor as ext
from thefuzz import fuzz
import numpy as np

st.write("# Hello")

f = st.file_uploader('Website Download of ShiftAdmin Results Page:', type='html')
if f is not None:
    shiftsp = ext.extract_calendar(f).reset_index()
else:
    st.stop()

sheet_names = st.text_area("Your list of resident names, separated by newlines:")
sheet_names = sheet_names.lower().split('\n')
# st.write([fuzz.ratio(test_str, s) for s in sheet_names])

new_order = [
    np.argmax([fuzz.ratio(user_name, sn) for sn in sheet_names])
    for user_name in shiftsp['userName']
]

shiftsp['newOrder'] = new_order
shiftsp = shiftsp.sort_values('newOrder')
shiftsp
# st.dataframe(shiftsp)
