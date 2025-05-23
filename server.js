const express = require('express');
const app = express();
const cors = require('cors');

// السماح بالوصول عبر CORS لاختبارات FreeCodeCamp
app.use(cors({ optionsSuccessStatus: 200 }));

// إرسال ملف HTML اختياري
app.use(express.static('public'));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API الرئيسي للتواريخ
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  // إذا لم يُرسل تاريخ، نُرجع التاريخ الحالي
  if (!date) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // إذا كان التاريخ رقمًا (تاريخ بالميلي ثانية)
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // التحقق من صحة التاريخ
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // إرجاع التاريخ بصيغتي Unix و UTC
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// تشغيل الخادم
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
