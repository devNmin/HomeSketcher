FROM python:3.10

WORKDIR /code

COPY . .
 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
 
 
#CMD ["uvicorn", "fastapi.main:app", "--host", "0.0.0.0", "--port", "8080"]