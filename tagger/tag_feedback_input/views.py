from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Buyer, Market, Commodity, Quality, Tag, Feedback, Comment, Post
from .serializer import BuyerSerializer, MarketSerializer, CommoditySerializer, QualitySerialzer, TagSerialzer, CommentSerialzer, FeedbackSerialzer, PostSerialzer
# Create your views here.

class BuyerView(ModelViewSet):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer

class MarketView(ModelViewSet):
    queryset = Market.objects.all()
    serializer_class = MarketSerializer

class CommodityView(ModelViewSet):
    queryset = Commodity.objects.all()
    serializer_class = CommoditySerializer

class QualityView(ModelViewSet):
    queryset = Quality.objects.all()
    serializer_class = QualitySerialzer

class TagView(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerialzer

class CommentView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerialzer

class FeedbackView(ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerialzer

class PostView(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerialzer


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