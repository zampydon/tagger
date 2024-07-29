from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Buyer, Market
from .serializer import BuyerSerializer
# Create your views here.

class BuyerView(ModelViewSet):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer

# class BuyerView(APIView):
    
#     def get(self, request, id=None, format=None):
#         buyer_list = Buyer.objects.all()
#         request
#         print(id)
#         return Response(buyer_list)
    
#     def post(self, request):
#         pass

#     def update(self, request, id=None):
#         print(id)
#         return Response({"id": id})
    
#     def delete(self, request, id=None):
#         print(id)
#         return Response({"id":id})
    
# class MarketView(APIView):

#     def get(self, request, id=None, format=None):
#         market_list = Market.objects.all()

#     def post(self, request):
#         pass
    
#     def update(self, request):
#         pass

#     def delete(self, requset):
#         pass