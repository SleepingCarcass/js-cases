from django.shortcuts import render, redirect
from .forms import NameForm
from .models import UserName

def index(request):
    greeting = None
    form = NameForm()

    if request.method == 'POST':
        form = NameForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name'].strip()
            if name:
                # Сохраняем имя в базу данных
                UserName.objects.create(name=name)
                greeting = f'Привет, {name}!'
            else:
                form.add_error('name', 'Имя не может состоять только из пробелов.')

    return render(request, 'greeter/index.html', {
        'form': form,
        'greeting': greeting,
    })
