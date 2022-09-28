FROM python:3.10

WORKDIR /app

COPY requirements.txt ./
 
RUN pip3 install --upgrade pip 

RUN pip3 install -r requirements.txt 

# RUN pip3 install uvicorn[standard]

# RUN pip3 install gunicorn && gunicorn

COPY . .

EXPOSE 8003
 
#CMD ["uvicorn", "fastapi.main:app", "--host", "0.0.0.0", "--port", "8080"]