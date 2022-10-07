<img src="https://user-images.githubusercontent.com/53360337/194005461-b4ef4138-d62d-442c-9e73-f20a5733a38e.png" width="300" height="300">

# Home Sketcher
- 서비스명 : Home Sketcher
- 팀 구성원 : 권혁림, 강승훈, 김진산, 윤영훈, 이슬기, 조경민 
- 개발 기간 : 2022.08.29 ~ 2022.10.07 (6주)
- 서비스 개요 : 가구 추천 및 배치 웹 서비스
- [Notion](https://chalk-care-a87.notion.site/HomeSketcher-f421e3df82ab4274ba15d4493df85bdb)

# 목차
[1. 서비스 소개](#1)

[2. 시스템 아키텍처](#2)

[3. 기술 스택](#3)

[4. 프로젝트 산출물](#4)

[5. 데이터 출처](#5)

<br/>
<div id = '1'>

# 서비스 소개

<h2> 맞춤 가구 추천 및 배치 모델링 서비스 </h2>

<br>

## 주요 기능
### 다크 모드
- 다크모드

![다크모드](https://user-images.githubusercontent.com/53360337/194351952-27176b14-e955-48b7-a7bd-cb745b6018a9.gif)

<br>

### 취향 분석
- 취향 분석

![취향분석](https://user-images.githubusercontent.com/53360337/194352305-c03ad8e9-a6f4-4aa9-a831-6df63eb94284.gif)

<br>

### 가구 추천
- 가구 추천

![가구 추천](https://user-images.githubusercontent.com/53360337/194352395-56873f54-1cdf-4009-8bf8-614a77a0bc3b.gif)

<br>

### 3D 모델링
- 방 그리기

![사각형 그리기](https://user-images.githubusercontent.com/53360337/194352471-7b4806a2-5958-419c-8a98-96eefbeb9e24.gif)

- 방 가구 추가

![가구 추가](https://user-images.githubusercontent.com/53360337/194352528-055de6a1-c8c6-4c3e-950b-7ff492ab7177.gif)

- 가구 이동 및 변환

![가구 변환](https://user-images.githubusercontent.com/53360337/194352577-cea7899d-9a8c-41b7-a18a-4b25a4544837.gif)

- 벽 변경

![벽 색상 변경](https://user-images.githubusercontent.com/53360337/194352653-33ad3995-49ea-4831-9204-8258bffa3d29.gif)

- 시점 변경

![가구 뷰 변경](https://user-images.githubusercontent.com/53360337/194352752-838386eb-75fb-492a-aa4e-0d9596cd4ef3.gif)

- 캡쳐

![캡쳐](https://user-images.githubusercontent.com/53360337/194352809-4d4cad0e-62b1-4325-9b96-9028676db41c.gif)

- 저장 및 불러오기

![저장 및 불러오기](https://user-images.githubusercontent.com/53360337/194352960-3ed567fa-ec83-47c5-88ba-d743badbc891.gif)

<br>

### 이미지 스타일 분석 (Beta)
- 스타일 분석

![앤틱 이미지 검사](https://user-images.githubusercontent.com/53360337/193837665-a3088e60-31e4-4d2d-9863-4f759ea36c31.gif)

- 나이별 스타일

![나이별 스타일](https://user-images.githubusercontent.com/53360337/193837821-66722c66-d49f-4e06-8347-e2aaf3fba2b5.gif)

- 나이별 컬러

![나이별 컬러](https://user-images.githubusercontent.com/53360337/193837781-e7917878-d1f4-45ac-9b50-b7d5964523ce.gif)

- 성별별 스타일

![성별별 스타일](https://user-images.githubusercontent.com/53360337/193837744-6adab978-a4f3-4bc6-ae76-99618f8da237.gif)

- 성별별 컬러

![성별별 컬러](https://user-images.githubusercontent.com/53360337/193837711-b5f1efb8-e6f8-49ec-b176-d8b8cd8faae9.gif)


<div id = '2'>

<br>

# 시스템 아키텍처
![image](https://user-images.githubusercontent.com/53360337/193612741-8d4d745f-f230-4f2a-a97c-02b06d07a690.png)

<br>

<div id = '3'>

# 기술 스택
<div align=center></div>

<div align=center> 
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"> 
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white"> 
  <img src="https://img.shields.io/badge/Numpy-013243?style=for-the-badge&logo=Numpy&logoColor=white">
  <img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white">
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white">
  <img src="https://img.shields.io/badge/keras-D00000?style=for-the-badge&logo=keras&logoColor=white">
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white">
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white">

  <br>

  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=Three.js&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">

  <br>

  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> 
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white"> 
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"> 

  <br>

  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> 
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> 
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">

  <br>

  <img src="https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=GitLab&logoColor=white"> 
  <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">
  <img src="https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=Amazon EC2&logoColor=white">

  <br>
</div>
<br>

## 기술스택 및 버전 상세

| 구분       | 기술스택                    | 상세내용                 | 버전          |
| -------- | ----------------------- | -------------------- | ----------- |
| 공통     |                     |                |         |
|          | 형상관리                    | Gitlab               | \-          |
|          | 이슈관리                    | Jira                 | \-          |
|          | 커뮤니케이션                  | Mattermost   | \-          |
|          | 커뮤니케이션                  | Notion   | \-          |
| Server   |                       |             |          |
|          | 서버                      | AWS EC2              | \-          |
|          | 플랫폼                     | Ubuntu               | 20.04         |
|          | 배포                      | Docker               | 20.10.17         |
|          | 배포                      | Docker Compose              |  2.6.0         |
|          | 배포                      | Jenkins              | 2.346.2          |
|          | 배포                      | Nginx              | 1.23.1         |
| BackEnd  |                      |                 |        |
|         | DB                      | MySQL                | 8.0.30         |
|         | DB                      | FireBase             | -         |
|          | Cache Storage           | Redis              | 7-alpine         |
|          | Python                    |                  | 3.9.4   |
|FastAPI          |                     |                  |    |
|          | Python                    |                  | 3.10   |
|          | Numpy                    |                  | 1.23.3   |
|          | Pandas                    |                  | -   |
|          | Keras                    |                  | 2.10.0   |
|          | Tensiflow                    |                  | 2.10.0   |
| FrontEnd |                    |                      |          |
|          | HTML5                   |                      | \-          |
|          | CSS3                    |                      | \-          |
|          | JavaScript(ES6)         |                      |\-           |
|          | React         |                      |  18.2.0       |
|          | Three.js         |                      | 0.144.0       |
|          | Build                   | Node               | 16.15.0        |
| IDE          |   Visual Studio Code                   |   |1.70.0          |

<br>

<div id = '4'>

# 프로젝트 산출물
- 세부 내용 : 노션 참조

<br>

## 시나리오

<img width="2811" alt="시연 시나리오" src="https://user-images.githubusercontent.com/53360337/193832809-58556ab5-a30c-4b1c-bdb0-535084afe44d.png">

<br>

## 기능 명세서
![image](https://user-images.githubusercontent.com/53360337/193490074-30c4e3de-e4d9-4e94-a36f-c789c0291fb2.png)

<br>

## ER-Diagram
![HomeSketcherErd (5)](https://user-images.githubusercontent.com/53360337/193612554-d9889d7b-0f0e-4329-8850-5f0896dc14ae.png)

<br>

## API 명세서
![image](https://user-images.githubusercontent.com/53360337/193490144-59334550-0d48-4fe6-8cd1-9264ca403bf7.png)

<br>

## 화면설계서
[화면설계서 - Figma](https://www.figma.com/file/thfT2MjPKNG0m5CTJXEjLT/%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%EC%B6%94%EC%B2%9C?node-id=0%3A1)

<br>

## EC2 포트

| 구분       | 포트번호                    | 
| -------- | ----------------------- |
| Jenkins         |  8080                | 
| Django         | 8081                    | 
| React         |  8002               | 
| FastAPI         |    8003              | 
| MySQL         |     3306             | 
| Redis         |   6379               | 

<br>

<div id="5">

# 데이터 출처
- 가구 Data : ikea-api 2.0.6
- OBJ Data : Alibaba - 3D-FUTURE: 3D Furniture Shape with Texture
