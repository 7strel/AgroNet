from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User



class ModuleInline(admin.TabularInline):
    model = User
    extra = 1



@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'password')
    search_fields = ('email',)
    list_filter = ('email',)

# class CustomeUserAdmin(UserAdmin):
#     model = User

#     list_display = ('first_name', 'last_name', 'email', 'password')
#     list_filter = ('email')

#     ordering = ('email')
#     search_fields = ('email', 'first_name', 'last_name')

#     add_fieldsets  = (
#         (None, {
#             'classes':('wide',),
#             'fields': ('first_name', 'last_name', 'email', 'password')
#         })
#     )

#     def save_model(self, request, obj, form, change):
#         if form.cleaned_data.get('password') and not change:
#             obj.set_password(form.cleaned_data['password'])
#         return super().save_model(request, obj, form, change)
    



# admin.site.register(User, UserAdmin)