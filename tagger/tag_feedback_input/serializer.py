from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Buyer, Market, Commodity, Quality, Tag, Comment, Feedback, Post, TargetPrice, BuyerSampleQuality, BuyerBagRequirement, BuyerInterest, InterestIssue, FollowUp, UnhappyCustomer, Stock

# class BuyerSerializer(serializers.Serializer):
#     buyer_code = serializers.CharFieldField(validators=[UniqueValidator(queryset=Buyer.object.all())])
#     shop_name = serializers.CharField()
#     shop_number = serializers.CharField()
#     owner_name = serializers.CharField()
#     market = serializers.StringRelatedField(many=True)

#     def create(self, validated_data):
#         return Buyer(**validated_data)

#     def update(self, instance, validated_data):
#         instance.email = validated_data.get('email', instance.email)
#         instance.content = validated_data.get('content', instance.content)
#         instance.created = validated_data.get('created', instance.created)
#         return instance

class BuyerSerializer(serializers.ModelSerializer):
    market = serializers.StringRelatedField(
        many=True,
        read_only=True
     )
    
    class Meta:
        model = Buyer
        fields = '__all__'
        extra_fields = ['market']
        
        def get_field_names(self, declared_fields, info):
            expanded_fields = super(BuyerSerializer, self).get_field_names(declared_fields, info)

            if getattr(self.Meta, 'extra_fields', None):
                return expanded_fields + self.Meta.extra_fields
            else:
                return expanded_fields
    

class MarketSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Market
        fields = '__all__'

        UniqueValidator(queryset=Market.objects.all())


class CommoditySerializer(serializers.ModelSerializer):
    class Meta:
        model = Commodity
        fields = '__all__'


class QualitySerialzer(serializers.ModelSerializer):
    commodity = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Quality
        fields = '__all__'
        extra_fields = ['commodity']

        def get_field_names(self, declared_fields, info):
            expanded_fields = super(QualitySerialzer, self).get_field_names(declared_fields, info)

            if getattr(self.Meta, 'extra_fields', None):
                return expanded_fields + self.Meta.extra_fields
            else:
                return expanded_fields

class TagSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CommentSerialzer(serializers.ModelSerializer):
    # post_id = serializers.StringRelatedField(required=False)
    class Meta:
        model = Comment
        exclude = ('post_id', )  

class FeedbackSerialzer(serializers.ModelSerializer):
    # buyer = serializers.StringRelatedField(read_only = True, many=True)
    class Meta:
        model = Feedback
        exclude = ('post_id',)
        # extra_fields = ['buyer']

        # def get_field_names(self, declared_fields, info):
        #     expanded_fields = super(FeedbackSerialzer, self).get_field_names(declared_fields, info)

        #     if getattr(self.Meta, 'extra_fields', None):
        #         return expanded_fields + self.Meta.extra_fields
        #     else:
        #         return expanded_fields
class TargetPriceSerialzer(serializers.ModelSerializer):
    class Meta:
        model = TargetPrice
        exclude = ('post_id',)

class BuyerSampleQualitySerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyerSampleQuality
        exclude = ('post_id',)

class BuyerBagRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyerBagRequirement
        exclude = ['post_id']

class BuyerInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyerInterest
        exclude = ['post_id']

class InterestIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestIssue
        fields = '__all__'

class FollowUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowUp
        exclude = ['post_id']

class UnhappyCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnhappyCustomer
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        exclude = ('post_id',)

class PostListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        for data in validated_data:
            comments = data.pop('comment')
            feedback = data.pop('feedback')
            tags = data.pop('tag_id')

            post = Post.objects.create(**data)
            Feedback.objects.create(post_id=post, **feedback) 
            
            for comment in comments:
                c = Comment.objects.create(**comment)
                c.post_id.add(post.post_id)
            
            
            for tag in tags:
                post.tag_id.add(tag.tag_id)
        return post

class PostSerialzer(serializers.ModelSerializer):
    comment = CommentSerialzer(required=False,many=True)
    buyer = serializers.StringRelatedField(read_only=True)
    feedback = FeedbackSerialzer(required=False)
    quality = serializers.StringRelatedField(read_only=True)
    buyer_bag_requirement = BuyerBagRequirementSerializer(required=False)
    buyer_interest = BuyerInterestSerializer(required=False)
    # interest_issue = InterestIssueSerializer(required=False)
    target_price = TargetPriceSerialzer(required=False)
    follow_up = FollowUpSerializer(required=False)
    unhappy_customer = UnhappyCustomerSerializer(required=False)
    stock = StockSerializer(required=False)
    # tag = serializers.StringRelatedField(many=True, read_only=True)
    # comment = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = '__all__'
        extra_fields = ['buyer','feedback', 'quality', 'comment', 'feedback_data','comment_data', 'buyer_bag_requirement', 'buyer_interest', 'interest_issue', 'follow_up', 'unhappy_customer', 'target_price', 'stock']
        list_serializer_class  = PostListSerializer

        def get_field_names(self, declared_fields, info):
            expanded_fields = super(PostSerialzer, self).get_field_names(declared_fields, info)

            if getattr(self.Meta, 'extra_fields', None):
                return expanded_fields + self.Meta.extra_fields
            else:
                return expanded_fields    
        

    def create(self, validated_data):
        print(validated_data)
        comments = validated_data.pop('comment')
        feedback = validated_data.pop('feedback')
        tags = validated_data.pop('tag_id')
        bags_nos = validated_data.pop('buyer_bag_requirement')
        stock_nos = validated_data.pop('stock')
        buyer_interest = validated_data.pop('buyer_interest')
        follow_up = validated_data.pop('follow_up')
        unhappy_customer = validated_data.pop('unhappy_customer')
        target_price = validated_data.pop('target_price')

        post = Post.objects.create(**validated_data)
        Feedback.objects.create(post_id=post, **feedback) 
        BuyerBagRequirement.objects.create(post_id=post, **bags_nos)
        Stock.objects.create(post_id=post, **stock_nos)
        BuyerInterest.objects.create(post_id=post, **buyer_interest)
        FollowUp.objects.create(post_id=post, **follow_up)
        UnhappyCustomer.objects.create(**unhappy_customer)
        TargetPrice.objects.create(post_id=post, **target_price)
        
        for comment in comments:
            c = Comment.objects.create(**comment)
            c.post_id.add(post.post_id)
        
        
        for tag in tags:
            post.tag_id.add(tag.tag_id)
        
        
        return post

class TimelineSerializer(serializers.Serializer):
    shop_name = serializers.CharField(required=False)
    feedback = serializers.CharField(required=False)
    tag_name = serializers.ListField(child=serializers.CharField())

# class PostListSerializer(serializers.ListSerializer):
#     post = PostSerialzer(many=True)

    
