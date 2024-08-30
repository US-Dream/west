document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('suggestionForm');
    const submitButton = form.querySelector('button[type="submit"]');
    let isSubmitting = false;  // مؤشر لتعقب حالة الإرسال
    let cooldownTime = 30000;  // وقت الانتظار بين كل إرسال (بالمللي ثانية، هنا دقيقة واحدة)

    const handleSubmit = function(event) {
        event.preventDefault();  // منع الإرسال الافتراضي للنموذج

        if (isSubmitting) return;  // منع الإرسال المزدوج
        isSubmitting = true;
        submitButton.disabled = true;  // تعطيل الزر لمنع النقرات المتعددة

        const sugName = document.getElementById('sugName').value;
        const sug = document.getElementById('sug').value;

        const webhookUrl = 'https://discord.com/api/webhooks/1265714527207686205/Wi4lqxojY9XIyCf8MMLej7Ez6KuFiUoqLO6HfgxtjxApJSxs3Apkobw_tGQeAsiJiNHn';

        const requestBody = {
            content: `**اقتراح جديد:\nالاسم:** **${sugName}\nالاقتراح: ${sug}**`
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
                // إظهار إشعار بنجاح الإرسال
                showNotification('تم إرسال الاقتراح بنجاح', 'success');
                form.reset();  // إعادة تعيين النموذج
            } else {
                // إظهار إشعار بفشل الإرسال
                showNotification('حدث خطأ أثناء إرسال الاقتراح', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // إظهار إشعار بفشل الإرسال
            showNotification('حدث خطأ أثناء إرسال الاقتراح', 'error');
        })
        .finally(() => {
            // تعيين وقت الانتظار قبل إعادة تمكين الزر
            setTimeout(() => {
                submitButton.disabled = false;  // إعادة تمكين الزر بعد انتهاء وقت الانتظار
                isSubmitting = false;  // إعادة تعيين حالة الإرسال
            }, cooldownTime);
        });
    };

    form.addEventListener('submit', handleSubmit);

    function showNotification(message, type) {
        const notificationContainer = document.getElementById('notification');
        const notification = document.createElement('div');
        notification.className = 'Not';

        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.innerHTML = type === 'success' ? '<i class="bi bi-check-circle"></i>' : '<i class="bi bi-x-circle"></i>';

        const msgContainer = document.createElement('div');
        msgContainer.className = 'msg';
        msgContainer.innerHTML = `<span>${type === 'success' ? 'نجاح' : 'خطأ'}</span><p>${message}</p>`;

        const progress = document.createElement('div');
        progress.className = 'progress';

        notification.appendChild(icon);
        notification.appendChild(msgContainer);
        notification.appendChild(progress);

        notificationContainer.appendChild(notification);

        // إزالة الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
