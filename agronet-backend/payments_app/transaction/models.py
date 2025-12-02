# from django.db import models

# from agronet_auth.models import User
# from learn_app.course.models import Course
# from marketplace_app.product.models import Product

# class Transaction(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('success', 'Success'),
#         ('failed', 'Failed')
#     ]

#     user = models.ForeignKey(User, related_name='user_payments', null=True, blank=True, on_delete=models.CASCADE)
#     course = models.ForeignKey(Course, related_name='course_payments', null=True, blank=True, on_delete=models.CASCADE )
#     product = models.ForeignKey(Product, related_name='product_payments', null=True, blank=True, on_delete=models.CASCADE)
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
#     created_time = models.DateTimeField(auto_now_add=True)
from django.db import models
from agronet_auth.models import User
from payments_app.order.models import Order  # adjust to your actual app structure

class TransactionStatus(models.TextChoices):
    PENDING = 'Pending'
    SUCCESS = 'Success'
    FAILED = 'Failed'

class Transaction(models.Model):
    user = models.ForeignKey(User, related_name='transactions', null=True, blank=True,on_delete=models.CASCADE)
    order = models.ForeignKey(Order, related_name='transactions', null=True, blank=True, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=TransactionStatus.choices, default=TransactionStatus.PENDING)
    payment_gateway = models.CharField(max_length=100, blank=True, null=True)  # e.g. 'flutterwave', 'momo'
    transaction_reference = models.CharField(max_length=255, blank=True, null=True)  # gateway's unique ref
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction #{self.id} - {self.status}"
