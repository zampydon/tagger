from typing import Any
from django.db import models
import datetime
# Create your models here.

# Will update it with the city
class Market(models.Model):
    market_id = models.AutoField(primary_key=True)
    market_name = models.TextField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.market_name

class Buyer(models.Model):
    buyer_code = models.TextField(primary_key=True)
    shop_name = models.TextField(unique=True, max_length=256)
    shop_number = models.TextField(unique=True)
    owner_name = models.TextField(max_length=256)
    buyer_number = models.IntegerField(unique=True)
    market_id = models.ForeignKey('Market', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.buyer_code} + {self.shop_name}"

class Commodity(models.Model):
    commodity_id = models.AutoField(primary_key=True)
    commodity_name = models.TextField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.commodity_name

class Quality(models.Model):
    quality_id = models.AutoField(primary_key=True)
    quality_code = models.TextField(unique=True)
    quality_name = models.TextField()
    internal_quality = models.TextField(choices=[(e,e.capitalize()) for e in ('low','medium','high')])
    commodity_id = models.ForeignKey('Commodity', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.commodity_id} + {self.quality_name} + {self.quality_code}"

class Feedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    feedback_content = models.TextField(db_index=True)
    feedback_type = models.TextField(choices=[(e,e.capitalize()) for e in ('visit','call')])
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    tag_name = models.TextField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.tag_name}"

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    comment_name = models.TextField()
    post_id = models.ManyToManyField('Post')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    buyer_id = models.ForeignKey('Buyer',on_delete=models.CASCADE)
    # feedback_id = models.ForeignKey('Feedback',on_delete=models.CASCADE)
    quality_id = models.ForeignKey('Quality', on_delete=models.CASCADE)
    tag_id = models.ManyToManyField('Tag')
    # comment_id = models.ManyToManyField('Comment')
    packaging_requirement_weight = models.FloatField(choices = [(e,e) for e in (50, 40, 30, 1, .500, .100)], default=30)
    customer_type = models.TextField(choices=[(e,e.capitalize()) for e in ('Wholesaler/Trader', 'Retail', 'Restaurant', 'Hotel', 'Caterer', 'Exporter', 'Manufacturer', 'Broker', 'Stockist', 'FPO')], default='Wholesaler/Trader')
    next_action = models.TextField(blank=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class TargetPrice(models.Model):
    target_id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE, blank=True)
    min_target_price = models.FloatField(blank=True, null=True)
    max_target_price = models.FloatField(blank=True, null=True)
    avg_target_price = models.FloatField(blank=True, null=True)
    include_gst = models.BooleanField(default=False) 

class BuyerSampleQuality(models.Model):
    target_id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey('Post',on_delete=models.CASCADE)
    sample_name = models.TextField(blank=True)

class BuyerBagRequirement(models.Model):
    bag_id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE)
    min_bag_number = models.IntegerField(null=True)
    max_bag_number = models.IntegerField(null=True)
    avg_kg = models.FloatField(null=True)

class Stock(models.Model):
    stock_id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey('Post',on_delete = models.CASCADE)
    min_bag_number = models.IntegerField(null=True)
    max_bag_number = models.IntegerField(null=True)
    avg_kg = models.FloatField(null=True)

# Add This using seprate form or direct sql
class InterestIssue(models.Model):
    interest_issue_id = models.AutoField(primary_key=True)
    issue_name = models.TextField()

class BuyerInterest(models.Model):
    buyer_interest_id = models.AutoField(primary_key=True)
    interest_issue_id = models.ForeignKey('InterestIssue', on_delete=models.CASCADE)
    post_id = models.ForeignKey('Post',on_delete=models.CASCADE)
    buyer_issue = models.TextField()

class FollowUp(models.Model):
    follow_up_id = models.AutoField(primary_key=True)
    follow_up_date = models.DateField(blank=True, default=datetime.date.today() + datetime.timedelta(days=3))
    follow_up_time = models.TimeField(blank=True)
    post_id = models.ForeignKey('Post',on_delete=models.CASCADE)

class UnhappyCustomer(models.Model):
    unhappy_customer_id = models.AutoField(primary_key=True)
    unhappy_customer_bool = models.BooleanField(default=False)
    unhappy_customer_reason = models.TextField(blank=False,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    