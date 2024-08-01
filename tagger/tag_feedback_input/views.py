from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Buyer, Market, Commodity, Quality, Tag, Feedback, Comment, Post, BuyerInterest, InterestIssue
from .serializer import BuyerSerializer, MarketSerializer, CommoditySerializer, QualitySerialzer, TagSerialzer, CommentSerialzer, FeedbackSerialzer, PostSerialzer, PostListSerializer, BuyerInterestSerializer, InterestIssueSerializer, TimelineSerializer
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
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['commodity_id']
    

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

    def get_serializer(self, *args, **kwargs):
        # checking for post only so that 'get' won't be affected
        if self.request.method.lower() == 'post':
            data = kwargs.get('data')
            kwargs['many'] = isinstance(data, list)
        return super(PostView, self).get_serializer(*args, **kwargs)

class InterestIssueView(ModelViewSet):
    queryset = InterestIssue.objects.all()
    serializer_class = InterestIssueSerializer


# class FetchQualityView(ViewSet):

#     def list(self, request, commodity_id):

#         queryset = Quality.objects.filter(commodity_id=commodity_id)
#         serialzer = QualitySerialzer(queryset, many=True)
#         return Response(serialzer.data)

class TimelineView(ViewSet):
    
    def list(self, request):
        id = request.query_params['buyer_id']
        post = Post.objects.filter(buyer_id=id)
        buyer_name_ = Buyer.objects.get(buyer_code=id)
        buyer_name = buyer_name_.shop_name
        feedback = Feedback.objects.filter()

        tags = post.get('tags')

        szr = TimelineSerializer(shop_name=buyer_name, feedback=feedback, tag_name=tags)
        return Response(szr.data)



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