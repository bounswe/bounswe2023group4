# Base image
FROM python:3.11.2

# Set the working directory
WORKDIR /backend

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install app dependencies
RUN pip3 install -r requirements.txt

# Copy the app files to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 8000

# Start the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
