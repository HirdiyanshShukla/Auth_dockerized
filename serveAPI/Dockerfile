FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

# Collect static files (optional)
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]