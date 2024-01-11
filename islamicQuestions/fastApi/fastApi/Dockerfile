FROM python
 WORKDIR /app
  COPY ./requirements.txt . 
  COPY ./models .
  RUN pip install -r requirements.txt 
  COPY . .
  EXPOSE 8000