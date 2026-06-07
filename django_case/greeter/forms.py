from django import forms

class NameForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        label='Ваше имя',
        widget=forms.TextInput(attrs={
            'placeholder': 'Введите ваше имя...',
            'class': 'name-input',
        }),
        error_messages={
            'required': 'Пожалуйста, введите имя.',
            'max_length': 'Имя не должно превышать 100 символов.',
        }
    )
