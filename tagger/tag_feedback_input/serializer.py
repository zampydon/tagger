from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Buyer, Market

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