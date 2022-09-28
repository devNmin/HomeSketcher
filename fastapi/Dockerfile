FROM python:3.10

RUN apt-get -y update

RUN apt-get -y install vim 

RUN mkdir /app

ADD . /app

WORKDIR /app

COPY requirements.txt ./
 
RUN pip3 install --upgrade pip 

RUN pip3 install -r requirements.txt 

# RUN pip3 install uvicorn[standard]

# RUN pip3 install gunicorn && gunicorn

EXPOSE 8003
 
#CMD ["uvicorn", "fastapi.main:app", "--host", "0.0.0.0", "--port", "8080"]