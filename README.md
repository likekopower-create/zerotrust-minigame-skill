# ZERO TRUST Minigame Skill

Skill พร้อมคู่มือภาษาไทยและ HTML5 starter สำหรับสร้างมินิเกมที่เล่นแยกได้ โดยไม่ต้องมีซอร์ส ZERO TRUST SIMULATOR และไม่ต้องมีคีย์ Supabase

## ติดตั้งใน Codex

ส่งคำสั่งนี้ให้ Codex ที่มี Skill Installer:

```text
$skill-installer install https://github.com/likekopower-create/zerotrust-minigame-skill/tree/main/skills/zerotrust-minigame
```

เมื่อเครื่องมือแจ้งว่าติดตั้งเสร็จ เริ่มเทิร์นใหม่แล้วเรียก:

```text
ใช้ $zerotrust-minigame ทำเกมตอบคำถามเรื่องการหลอกลวง รองรับมือถือแนวตั้งแนวนอน ทดสอบกับ mock host ก่อน โดยยังไม่เชื่อมคะแนนจริง
```

ถ้า agent ของคุณไม่มี Skill Installer ให้ดาวน์โหลด repository แล้วนำทั้งโฟลเดอร์ `skills/zerotrust-minigame` ไปยังตำแหน่ง Skill ที่ agent นั้นรองรับ ต้องนำ references และ assets ไปด้วย ไม่ใช่คัดลอกเฉพาะ SKILL.md

สำหรับ agent ที่รองรับเฉพาะไฟล์แนบ ให้แนบทั้งโฟลเดอร์ แล้วสั่งให้อ่าน `SKILL.md` และ `references/developer-guide.md` ก่อนทำงาน การรองรับการติดตั้งและรีโหลดแตกต่างกันตามเครื่องมือ ไม่ได้หมายความว่าลิงก์ GitHub จะติดตั้งได้ใน AI ทุกผลิตภัณฑ์โดยอัตโนมัติ

## อ่านเอกสาร

- [Skill](skills/zerotrust-minigame/SKILL.md)
- [คู่มือฉบับเต็ม 14 หัวข้อ](skills/zerotrust-minigame/references/developer-guide.md)
- [คู่มือ HTML สำหรับเปิดในเบราว์เซอร์](docs/MiniGame-Developer-Guide.html) — ดาวน์โหลดไฟล์แล้วเปิดอ่านได้ ไม่ต้องเปิด GitHub Pages เพื่อติดตั้ง Skill
- [ขั้นตอนเชื่อมระบบหลัก](skills/zerotrust-minigame/references/integration.md)
- [เกมตั้งต้นและโฮสต์จำลอง](skills/zerotrust-minigame/assets/starter/)

## รันทดสอบ

ใช้ Node.js ที่ติดตั้งในเครื่อง:

```sh
node skills/zerotrust-minigame/tests/protocol.test.cjs
node skills/zerotrust-minigame/tests/demo.test.cjs
```

ทดสอบเกมด้วยเบราว์เซอร์:

```sh
cd skills/zerotrust-minigame/assets/starter
python -m http.server 8780 --bind 127.0.0.1
```

เปิด `http://127.0.0.1:8780/test-host.html` สำหรับโฮสต์จำลอง หรือ `/game/index.html` สำหรับเล่นแยก

## สถานะและขอบเขต

- โปรโตคอล `zt-minigame/1` และเดโมในชุดนี้เป็นข้อตกลงสำหรับเกมภายนอก ตัวรับ production ใน Simulation ยังต้องเพิ่มภายหลัง
- mock host ให้คะแนนจำลองและกันซ้ำเฉพาะหน่วยความจำ ไม่เขียน Supabase ไม่ใช่ระบบป้องกันโกงหรือบันทึกถาวร
- unit tests ตรวจตรรกะด้วย mock window/DOM ยังไม่ได้รับรอง layout ทุกอุปกรณ์หรือส่งคะแนนจริง
- ไม่มีตัวเกมหลัก ข้อมูลผู้เล่น รหัสผ่าน คีย์ Supabase หรือไฟล์ Word ที่ยังไม่ได้ตรวจรูปแบบใน repository นี้

การติดตั้ง Skill เป็นการเพิ่มคำแนะนำ คู่มือและไฟล์ตัวอย่างให้ agent ไม่ได้ติดตั้งเกมเข้า Simulation อัตโนมัติ

รูปแบบ Codex Skill อ้างอิง [เอกสาร OpenAI](https://learn.chatgpt.com/docs/build-skills) ส่วนการติดตั้งจาก GitHub ใช้ Skill Installer ที่มีในเครื่องมือปลายทาง
