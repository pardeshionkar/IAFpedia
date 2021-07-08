from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'main_page.html')

def privacy_policy(request):
    return render(request,'privacy_policy_page.html')