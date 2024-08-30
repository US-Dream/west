document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applyForm');
    const submitButton = form.querySelector('button[type="submit"]');
    let isSubmitting = false;  // مؤشر لتعقب حالة الإرسال
    let cooldownTime = 30000;  // وقت الانتظار بين كل إرسال (بالمللي ثانية)

    const handleSubmit = function(event) {
        event.preventDefault();  // منع الإرسال الافتراضي للنموذج

        if (isSubmitting) return;  // منع الإرسال المزدوج
        isSubmitting = true;
        submitButton.disabled = true;  // تعطيل الزر لمنع النقرات المتعددة

        const applyId = document.getElementById('usernameId').value;
        const reason1 = document.getElementById('reason1').value;
        const reason2 = document.getElementById('reason2').value;
        const reason3 = document.getElementById('reason3').value;
        const question1 = document.getElementById('question1').value;
        const question2 = document.getElementById('question2').value;
        const question3 = document.getElementById('question3').value;
        const question4 = document.getElementById('question4').value;
        const question5 = document.getElementById('question5').value;
        const question6 = document.getElementById('question6').value;
        const question7 = document.getElementById('question7').value;
        const question8 = document.getElementById('question8').value;
        const question9 = document.getElementById('question9').value;
        const question10 = document.getElementById('question10').value;

        // التحقق من اختيار إجابة واحدة على الأقل
        const radioChecked = Array.from(document.getElementsByName('answer_1')).some(radio => radio.checked);

        if (!radioChecked || !applyId || !reason1 || !reason2 || !reason3 || !question1 || !question2 || !question3 || !question4 || !question5 || !question6 || !question7 || !question8 || !question9 || !question10) {
            showNotification('يرجى ملء جميع الحقول.', 'error');
            isSubmitting = false;
            submitButton.disabled = false;
            return;
        }

        const webhookUrl = 'https://discord.com/api/webhooks/1265714527207686205/Wi4lqxojY9XIyCf8MMLej7Ez6KuFiUoqLO6HfgxtjxApJSxs3Apkobw_tGQeAsiJiNHn';

        const requestBody = {
            content: `**تقديم جديد**\n\n**إيدي الديسكورد:** ${applyId}\n**سبب التقديم:** ${reason1}\n**خبرة الإدارة:** ${reason2}\n**إداري في سيرفرات أخرى:** ${reason3}\n**التعامل مع النزاعات:** ${question1}\n**الخصائص المهمة في المدير:** ${question2}\n**جعل السيرفر مرح وآمن:** ${question3}\n**خطوات التعامل مع الشكوى:** ${question4}\n**التعامل مع الضغوطات:** ${question5}\n**مهارات أخرى:** ${question6}\n**رؤيتك بعد عام:** ${question7}\n**التعامل مع الأعضاء الجدد:** ${question8}\n**تعزيز التفاعل والنشاط:** ${question9}\n**الوقت المتاح:** ${question10}\n**ردك على الطلب الإداري:** ${document.querySelector('input[name="answer_1"]:checked').nextElementSibling.textContent}`
        };

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                showNotification('تم تقديم الطلب بنجاح', 'success');
                form.reset();  // إعادة تعيين النموذج
            } else {
                showNotification('حدث خطأ أثناء تقديم الطلب', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('حدث خطأ أثناء تقديم الطلب', 'error');
        })
        .finally(() => {
            setTimeout(() => {
                submitButton.disabled = false;  // إعادة تمكين الزر بعد انتهاء وقت الانتظار
                isSubmitting = false;  // إعادة تعيين حالة الإرسال
            }, cooldownTime);
        });
    };

    form.addEventListener('submit', handleSubmit);

    function showNotification(message, type) {
        const notificationContainer = document.getElementById('notification');
        if (!notificationContainer) return;

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px';
        notification.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        notification.style.color = type === 'success' ? '#155724' : '#721c24';
        notification.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';

        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.innerHTML = type === 'success' ? '<i class="bi bi-check-circle"></i>' : '<i class="bi bi-x-circle"></i>';

        const msgContainer = document.createElement('div');
        msgContainer.className = 'msg';
        msgContainer.innerHTML = `<span>${type === 'success' ? 'نجاح' : 'خطأ'}</span><p>${message}</p>`;

        notification.appendChild(icon);
        notification.appendChild(msgContainer);

        document.body.appendChild(notification);

        // إزالة الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
