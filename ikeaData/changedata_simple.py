import json
import re
from unicodedata import category
with open ("ikea_sample_file.json", "r") as f:
    data = json.load(f)

print(len(data)) # 11823
# print(data[222]) # 11823
# print(data[0].keys()) 
# breadcrumbs : 카테고리 
# print(data[131]['breadcrumbs']) 
# print(data[131]['product_url']) 
# (['product_title', 'product_url', 'sku', 'mpn', 'currency', 'product_price', 'product_condition', 
# 'availability', 'seller', 'seller_url', 'brand', 'raw_product_details', 'breadcrumbs', 'country',
#  'language', 'average_rating', 'reviews_count'])


def searching_data(n,start_str,end_str):
    start_flag = False
    end_flag = False
    data_rpd = data[n]['raw_product_details'].split()
    size_data = ''
    for data_rpdi in data_rpd:
        # print(data_rpdi)
        if start2_flag:
            if data_rpdi == end_str:
                end_flag = True
                # print("--------------------------------end-----------------------------")
        if start_flag and (end_flag ==False):
            size_data += data_rpdi

        if data_rpdi == start_str:
            start_flag = True
            # print("------------------------------finding---------------------------")
    # print('size_data',size_data)
    return size_data

start_str_legth = 'class="range-revamp-product-details__label--bold">Length:</span>' 
end_str_legth = '"</span>/<span'
start_str_width = 'class="range-revamp-product-details__label--bold">Width:</span>'
end_str_width = '"</span>/<span' 
start_str_height = 'class="range-revamp-product-details__label--bold">Height:</span>' 
end_str_height = '"</span>/<span'
start_str_weight = 'class="range-revamp-product-details__label--bold">Weight:</span>'
end_str_weight = 'oz</span>/<span' 
n = 13
# (['product_title', 'product_url', 'sku', 'mpn', 'currency', 'product_price', 'product_condition', 
# 'availability', 'seller', 'seller_url', 'brand', 'raw_product_details', 'breadcrumbs', 'country',
#  'language', 'average_rating', 'reviews_count'])



ikea_mod_file = []
for i in range(len(data)):
    n = i
    result = {}
    result['product_title'] = data[n]['product_title']
    result['product_url'] = data[n]['product_url']
    result['product_price'] = data[n]['product_price']
    result['average_rating'] = data[n]['average_rating']
    result['reviews_count'] = data[n]['reviews_count']
    result['width'] = searching_data(n,start_str_width,end_str_width)
    result['height'] = searching_data(n,start_str_height,end_str_height)
    result['legth'] = searching_data(n,start_str_legth,end_str_legth)
    # result.pop('raw_product_details')

    category_f = data[n]['breadcrumbs']
    b_count = 0
    for m in re.finditer('/', category_f):
        # print('/ found', m.start(), m.end())
        b_count += 1
        if b_count == 4:
            data[n]['breadcrumbs_category'] = category_f[0:m.end()]
            # print(category[0:m.end()])
    ikea_mod_file.append(result)

# json_string = json.dumps(ikea_mod_file)

with open('ikea_mod_simple.json', 'w') as f:
    json.dump(ikea_mod_file, f)