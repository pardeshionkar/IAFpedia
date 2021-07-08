from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'main_page.html')

def privacy_policy(request):
    return render(request,'privacy_policy_page.html')
def exams(request):
    return render(request,'exam_main_page.html')
def exam_subpage(request):
    return render(request,'exam_subpage.html')