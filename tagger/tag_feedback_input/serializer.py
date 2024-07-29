from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Buyer, Market, Commodity, Quality, Tag, Comment, Feedback, Post

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
    class Meta:
        model = Comment
        fields = '__all__'

class FeedbackSerialzer(serializers.ModelSerializer):
    buyer = serializers.StringRelatedField(read_only = True, many=True)
    class Meta:
        model = Feedback
        fields = '__all__'
        extra_fields = ['buyer']

        def get_field_names(self, declared_fields, info):
            expanded_fields = super(FeedbackSerialzer, self).get_field_names(declared_fields, info)

            if getattr(self.Meta, 'extra_fields', None):
                return expanded_fields + self.Meta.extra_fields
            else:
                return expanded_fields

class PostSerialzer(serializers.ModelSerializer):
    buyer = serializers.StringRelatedField(read_only=True)
    feedback = serializers.StringRelatedField()
    quality = serializers.StringRelatedField()
    tag = serializers.StringRelatedField(many=True)
    comment = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = '__all__'
        extra_fields = ['buyer','feedback', 'quality', 'tag', 'comment']

        def get_field_names(self, declared_fields, info):
            expanded_fields = super(PostSerialzer, self).get_field_names(declared_fields, info)

            if getattr(self.Meta, 'extra_fields', None):
                return expanded_fields + self.Meta.extra_fields
            else:
                return expanded_fields    