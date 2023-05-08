import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import poll_serializer
import os
from dotenv import load_dotenv
from api.models.poll_model import Poll
from django.shortcuts import render
# Create your views here.


class createPoll(APIView):
    def post(self,request, format = None):
        serializer = self.serializer_class(data=request.query_params)
        try:
            serializer_class = poll_serializer
            if serializer.is_valid():
                ###load_dotenv()
                SECRET_KEY = os.getenv('SECRET_KEY')
                url = 'https://api.pollsapi.com/v1/create/poll'
                headers = {'Content-Type': 'application/json'}
                headers.update({'api-key': SECRET_KEY})
                question_element = ''
                firstOption_element = ''
                secondOption_element = ''
                thirdOption_element = ''
                fourthOption_element = ''
                # identifier_element = serializer.data.get('identifier')
                question_element = serializer.data.get('question')
                optionsList = []
                firstOption_element = serializer.data.get('firstOption')
                secondOption_element = serializer.data.get('secondOption')
                thirdOption_element = serializer.data.get('thirdOption')
                fourthOption_element = serializer.data.get('fourthOption')
                optionsList.append(firstOption_element)
                optionsList.append(secondOption_element)
                optionsList.append(thirdOption_element)
                optionsList.append(fourthOption_element)
                ##optionsList = ['Good','Bad','Happy']
                identifier = {}
                question = {}
                options = {}
                question.update({'question', question_element})
                identifier.update({'identifier': 'custom identification'})
                data = {'data': {'custom': 'Poll Data'}}
                for option in optionsList:
                    subOption = {}
                    subOption.update({'text': option})
                    subOption.update({'data': {'custom': 'data'}})
                    options.update(subOption)
                payload = {}
                payload.update(question)
                payload.update(identifier)
                payload.update(data)
                payload.update(options)
                requests.post(url, data=json.dumps(payload), headers=headers)
                new_Poll = Poll.objects.create(question=question_element, firstOption=firstOption_element,
                                               secondOption=secondOption_element, thirdOption=thirdOption_element,
                                               fourthOption=firstOption_element)
                return Response(poll_serializer(new_Poll).data, status.HTTP_201_CREATED)

        except:
            return Response(status.HTTP_400_BAD_REQUEST)











