From python:3.7.9

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update

RUN apt-get -y install vim 

RUN mkdir /srv/docker-server

ADD . /srv/docker-server 

WORKDIR /srv/docker-server 

RUN pip3 install --upgrade pip 

RUN pip3 install -r requirements.txt 

EXPOSE 8001

CMD ["python", "manage.py","runsslserver", "0.0.0.0:8001","--certificate" ,"/etc/letsencrypt/live/j7b304.p.ssafy.io/cert.pem","--key","/etc/letsencrypt/live/j7b304.p.ssafy.io/privkey.pem"]