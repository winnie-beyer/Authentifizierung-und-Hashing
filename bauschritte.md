 1. **Erstellen Sie die package.json mit `npm init -y`**
 2. **Setzen Sie den Typ in der packag.json auf `type: modules`**
 3. **Installieren Sie die benötigten Pakete `npm i bcrypt  dotenv express mongoose`**

 4. **Einrichten von Umgebungsvariablen:**
 - Erstellen Sie eine .env-Datei mit folgendem Inhalt
  ```javascript

  MONGO_URL = your monGO URL
  PORT=3000
  ```

5. **Datenbankverbindung erstellen**
 - Erstellen Sie eine neue ordner  `database`
 - In `database` Erstellen Sie eine neue Datei  `connectDB.js`
 - In der `connectDB.js`-Datei erstellen Sie eine Datenbankverbindung mit mongoDB, wie folgt:

```javascript
import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
```

2. **Benutzermodell erstellen**
 - Create a new file  models/user

 ```js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = mongoose.model('SecureUsers', userSchema)
export default User
```



## Endpoints

7. ## Benutzerregistrierungs-Endpunkt::
- Definieren Sie einen POST-Endpunkt unter /register für die Benutzerregistrierung.
- Überprüfen Sie, ob die erforderlichen Felder, wie E-Mail und Passwort, im - Anforderungskörper vorhanden sind. Andernfalls senden Sie einen Fehlercode 400 zurück.
- Hashen Sie das Passwort mit einer Sicherheitsstufe von 10.
- Erstellen Sie einen neuen Benutzer in der Datenbank mit der gehashten      Version des Passworts.
- Senden Sie die Daten des neuen Benutzers in der Antwort mit dem Statuscode 201.

```javascript   
app.post("/register", async (req, res) => {
    const { email, password, biography, username } = req.body

    if (!email || !password || !biography || !username) {
        return res.status(400).json({ error: 'Invalid registration' })
    }

    try {
        const user = await User.create({ biography, email, password, username })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' })
    }
})


```
1.  **Benutzeranmelde-Endpunkt:**
- Definieren Sie einen POST-Endpunkt unter /login für den Benutzerlogin.
- Überprüfen Sie, ob die erforderlichen Felder, wie E-Mail und Passwort, im  Anforderungskörper vorhanden sind. Andernfalls senden Sie einen Fehlercode 400 zurück.
- Suchen Sie den Benutzer in der Datenbank anhand der bereitgestellten E-Mail.
- Wenn der Benutzer nicht gefunden wird, senden Sie einen Fehlercode 401 zurück.
- Vergleichen Sie das eingegebene Passwort mit dem gespeicherten Passwort des Benutzers nach dem Hash-Verfahren.
- Wenn das Passwort nicht übereinstimmt, senden Sie einen Fehlercode 401 zurück.
- Senden Sie eine JSON-Antwort mit dem Status "success" und den Benutzerinformationen zurück.
 


 ```javascript  
app.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid login' })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ error: 'Invalid login' })
    }
     const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
        return res.status(401).json({ error: 'Invalid login' })
    }

    res.json({ status: "success", user })
})
```



1.  **get all users**
   - Definieren Sie einen GET-Endpunkt unter /users für die Benutzeranmeldung.
    - Senden Sie eine JSON-Antwort mit allen Benutzern.
    - 
```javascript    
// This is simply for testing purposes
app.get('/users', async (req, res) => res.json(await User.find()))
```

