FROM python:3.10

WORKDIR /code

COPY . .
 
RUN pip3 install --upgrade pip 

RUN pip3 install -r requirements.txt 

# RUN pip3 install uvicorn[standard]

# RUN pip3 install gunicorn && gunicorn

EXPOSE 8003
 
#CMD ["uvicorn", "fastapi.main:app", "--host", "0.0.0.0", "--port", "8080"]