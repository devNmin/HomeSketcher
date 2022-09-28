import pandas as pd
import numpy as np
import random, json, pickle

def hot_furnitures(user_like_furniture_data): # cal views count
    
    user_like_furniture_json = json.dumps(user_like_furniture_data)

    user_like_furniture = pd.read_json(user_like_furniture_json)

    res = list(user_like_furniture.furniture_id.value_counts().keys())

    with open("util/data/hot_furnitures.txt", 'wb') as lf:
        pickle.dump(res, lf)


def read_hot_furnitures(): 

    with open("util/data/hot_furnitures.txt", 'rb') as lf:
        readList = pickle.load(lf)
        
    return readList

def add_recom(user_new):
    recom_org = pd.read_csv('util/recom_table.csv')
    user_df3 = pd.read_csv('util/user_to_user_table.csv')
    
    userPk = user_new

    user_number = len(user_df3)+1
    furniture_number = len(user_df3)+1
    test = np.random.random((user_number,furniture_number))
    test = test*100
    viewstable_origin = np.int32(test)
    recom_table = []
    idx_dict = {}
    result = []
    limit_number = 5 # 일치하는 컬럼수
    user_i = userPk # 찾고자 하는 사람의 PK
    while len(result) < 10 : # 총 비슷한 사람 10명까지 
        user_df3_user_i = user_df3[(user_df3[f'{user_i}'])==limit_number]
        sim_user1 = list(user_df3_user_i.index)

        if limit_number == 5: #5일때 자기자신 빼줘야해서
            for i in range(len(sim_user1)):
                result.append(int(sim_user1[i]))
                result = result[1:] # 5일때 가장 첫번째가 자기자신이니까
        else: # 1,2,3,4
            random.shuffle(sim_user1) # 섞어준다
            for i in range(len(sim_user1)):
                result.append(int(sim_user1[i]))

        limit_number -= 1
    top10_user = result[0:10]

    top1_user =random.choice(top10_user)
    top1_arr = np.array(viewstable_origin[top1_user])
    top10_furniture = list(top1_arr.argsort()[-20:][::-1])
    idx_dict['user_pk'] = str(user_i)
    idx_dict['recom_fur_pk'] = top10_furniture
    
    recom_table.append(idx_dict)
    recom_add_table = pd.DataFrame(recom_table)
    recom_mod = recom_org.append(recom_add_table)
    recom_mod.to_csv('util/recom_table.csv',index=False)

def add_new_member(member_data):
    user_df = pd.read_csv('util/user_dataframe.csv') # 기존 유저 정보 테이블 불러오기 
    user_df.set_index("user_pk",inplace=True)
    user_df['user_age'] = user_df.user_age.astype(str)
    user_dummy_98 = pd.get_dummies(user_df) # 0 1 1 0 0 0  1 1 등으로 colum 변경 
    user_dummy_98.to_csv('util/user_dummy_98.csv') # 저장 
    user_df_2 = user_dummy_98.transpose()	#행 열 전환
    user_df3 = user_dummy_98.dot(user_df_2) # 행렬곱을 통한 유사도 


    # 신규 유저 
    new_member_df = pd.DataFrame([member_data],columns=['user_pk','user_style', 'user_color', 'user_age', 'user_gender','user_interest'])
    new_member_df['user_age'] = new_member_df.user_age.astype(str)
    new_member_df_dum = pd.get_dummies(new_member_df)
    concat_df = pd.concat([user_dummy_98,new_member_df_dum])
    concat_df = concat_df.fillna(0)
    concat_df.set_index("user_pk",inplace=True)

    new_df = concat_df.iloc[-1]
    print(new_df)
    print("------------------")
    print(user_df_2)

    append_df = new_df.dot(user_df_2)

    user_df3 = user_df3.append(append_df)
    append_list = list(append_df)
    append_list.append(5)
    pd_col = pd.DataFrame({f'{int(append_df.name)}' : append_list})
    user_df3 = user_df3.join(pd_col)
    user_df3.to_csv('util/user_to_user_table.csv')
    new_member_df.set_index("user_pk",inplace=True)
    user_df = user_df.append(new_member_df)
    user_df.to_csv('util/user_dataframe.csv')

    add_recom(member_data[0])

# views_table
def return_recom_funr(user_pk):
    read_views_table = pd.read_csv('util/recom_table.csv')
    recom_list = (read_views_table.iloc[user_pk].recom_fur_pk[1:-2]).split(',')
    
    return recom_list

# 일정 시간 마다 함수 실행시켜주기 
def cal_views(user_like_furniture_data):
    arr_csv = pd.read_csv('util/data/views.csv', index_col=0)
    user_like_furniture_json = json.dumps(user_like_furniture_data,indent=4)
    user_like_furniture = pd.read_json(user_like_furniture_json)
    # print(user_like_furniture)
    for i in range(len(user_like_furniture)):
        fur_id = user_like_furniture.iloc[i].furniture_id
        user_id = user_like_furniture.iloc[i].user_id
        
        # print(user_id,fur_id )
        arr_csv.iloc[user_id-1][fur_id-1] += 1
    arr_csv.to_csv('util/data/views.csv')
# 유저와 가구 조회수 출력
def read_views(user_pk,fur_pk):
    arr_csv = pd.read_csv('util/data/views.csv', index_col=0)
    return arr_csv.iloc[user_pk-1][fur_pk-1]

