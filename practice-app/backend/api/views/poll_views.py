import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import poll_serializer
import os
from dotenv import load_dotenv
from api.models.poll_model import Poll
import requests

# Create your views here.


class createPoll(APIView):
    serializer_class = poll_serializer
    def post(self,request, format = None):
        load_dotenv()
        Poll_SECRET_KEY = os.getenv('Poll_SECRET_KEY')
        url = 'https://api.pollsapi.com/v1/create/poll'
        headers = {'Content-Type': "application/json"}
        headers.update({'api-key': Poll_SECRET_KEY})
        question_element =request.POST.get('question')
        optionsList = []
        firstOption_element = request.POST.get('firstOption','')
        secondOption_element = request.POST.get('secondOption','')
        thirdOption_element = request.POST.get('thirdOption','')
        fourthOption_element =request.POST.get('fourthOption','')
        optionsList.append(firstOption_element)
        optionsList.append(secondOption_element)
        optionsList.append(thirdOption_element)
        optionsList.append(fourthOption_element)
        identifier = {}
        question = {}
        options = {}
        question.update({'question', question_element})
        identifier.update({'identifier': 'custom identification'})
        Data = {'data': {'custom': 'Poll Data'}}
        for option in optionsList:
            subOption = {}
            subOption.update({'text': option})
            subOption.update({'data': {'custom': 'data'}})
            options.update(subOption)
        payload = {}
        payload.update(question)
        payload.update(identifier)
        payload.update(Data)
        payload.update(options)
        requests.post(url, data=json.dumps(payload), headers=headers)
        new_Poll = Poll.objects.create(question=question_element, firstOption=firstOption_element,
                                               secondOption=secondOption_element, thirdOption=thirdOption_element,
                                               fourthOption=fourthOption_element)
        return Response(new_Poll, status.HTTP_201_CREATED)

                        
       

class ClearPoll(APIView):
    serializer_class = poll_serializer

    def delete(self,request,id=None):
        polls = Poll.objects.all()
        polls.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class collectPoll(APIView):
    serializer_class = poll_serializer

    def get(self,request,id=None):
        try:
                load_dotenv()
                Poll_SECRET_KEY = os.getenv('Poll_SECRET_KEY')
                url = 'https://api.pollsapi.com/v1/get/polls?'
                params = { 'offset': '0','limit':100}
                response = requests.get(url, params=params)
                if response.status_code == requests.codes.ok:
                    poll_json = response.json()
                    for poll in poll_json:
                        _question     = poll['question']
                        _firstOption  = poll['firstOption']
                        _secondOption = poll['secondOption']
                        _thirdOption  = poll['thirdOption']
                        _fourthOption = poll['fourthOption']
                        poll = Poll.objects.create(question=_question,firstOption=_firstOption,secondOption=_secondOption,thirdOption=_thirdOption ,fourthOption=_fourthOption)
                    return Response(poll_serializer(poll).data,status=status.HTTP_201_CREATED)
                else:
                    return Response(status=response.status_code)    
        except:
            return Response(status.HTTP_400_BAD_REQUEST)
        