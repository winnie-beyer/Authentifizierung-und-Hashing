# BE - Sicherheit - 03: Authentifizierung und Hashing


**HEUTE**
- Verschlüsselung vs. Hashing
- Passwort-Cracking
- Benutzerauthentifizierung

## Verschlüsselung vs Hashing

- Sicherheit muss in Schichten vorhanden sein
- Eine traurige Wahrheit ist, dass viele Benutzerdatenbanken gestohlen oder geleakt wurden
    - Einschließlich von einigen SEHR großen Unternehmen
        - Dropbox
        - LinkedIn
        - Twitter
        - ...

    - Wenn dein LinkedIn-Passwort durchsickert
        - Angreifer werden versuchen, sich mit ihm in dein Gmail/Netflix/Bankkonto einzuloggen
        - Du benutzt nicht dasselbe Passwort an vielen Stellen, oder?

- Es reicht nicht aus, Daten während der Übertragung (HTTPS) zu sichern
    - Daten sollten auch im Ruhezustand sicher sein

- Wenn der Inhalt einer Datenbank gestohlen wird
    - Es sollte _wirklich_ nicht möglich sein, Passwörter einfach als Klartext zu lesen
    - Die anderen Daten, wie z.B. E-Mail-Adressen, sind in der Regel Klartext

### Verschlüsselung

- Verschlüsselung ist umkehrbar
    - `Ich mag Katzen` ---verschlüsseln---> `V wüxg Xngmra`
    - `V wüxg Xngmra` ---entschlüsseln---> `Ich mag Katzen`

- Es gibt viele verschiedene Verschlüsselungsalgorithmen
    - Der oben verwendete ist kein ernsthafter, zeigt aber das Konzept
    - Lass uns experimentieren
    - Demo: https://rot13.com
        - Probiere ein paar verschiedene Eingaben aus
        - Mini-Aufgabe: entschlüssle "MunzoDB, Eprpurerff, Ratre, Nado"


- ROT-13 ist ein sehr einfacher Algorithmus
    - Die meisten Verschlüsselungsalgorithmen verwenden ein "Geheimnis" zur Verschlüsselung
    - Demo: https://encode-decode.com/aes-256-cbc-encrypt-online/
    - Das ist näher dran, wie HTTPS funktioniert
    - Das "Geheimnis" ist das, worauf sich Client und Server einigen
    - Der Client verschlüsselt mit dem Geheimnis
    - Der Server entschlüsselt mit dem Geheimnis

- Am wichtigsten: **Verschlüsselung kann umgekehrt werden**

### Hashing

- Hashing ist nicht umkehrbar
    - `Ich mag Katzen` ---hash---> `2c2a3390a9fc4bf9e67ac638f9b2f3ee`
    - `2c2a3390a9fc4bf9e67ac638f9b2f3ee` kann nicht umgekehrt werden

- Die gleiche Eingabe erzeugt immer die gleiche Ausgabe
    - Die Ausgabe wird "Hash" genannt

- Passwörter sollten _immer_ gehasht werden
    - Wenn jemand die Datenbank stiehlt
    - Sie können das Passwort nicht einfach entschlüsseln
    - Auf diese Weise ist es VIEL langsamer und schwieriger, Zugang zu den tatsächlichen Passwörtern zu bekommen
    - Aber immer noch nicht unmöglich

## Passwort-Cracking

- Du erhältst eine Liste von Benutzerkonten mit gehashten Passwörtern

    ```js
    const accounts = [
        { user: "Ace", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
        { user: "Pam", password: "96bd6436d12ee3301f81a24498fe072e" },
        { user: "Jim", password: "f25a2fc72690b780b2a14e140ef6a9e0" },
    ]
    ```

    - Du kannst sie nicht entschlüsseln, aber du erkennst, dass der Algorithmus MD5 ist
        - Glück gehabt! Das ist ein schlechter für Passwörter!

    - Du kennst auch die 3 häufigsten Passwörter
        - `123456`
        - `password`
        - `12345678`

    - Also entscheidest du dich, sie auszuprobieren
        - `md5("123456")`       --> e10adc3949ba59abbe56e057f20f883e
        - `md5("password")`     --> 5f4dcc3b5aa765d61d8327deb882cf99
        - `md5("12345678")`     --> 25d55ad283aa400af464c76d713c07ad

    - WOW! Sieht so aus, als ob das Passwort für "Ace" "password" ist

- Das war ein Beispiel für Passwort-Cracking mit einem Wörterbuchangriff
    - Du hast eine Liste von Millionen von gängigen Passwörtern
    - Du hasht jedes von ihnen einzeln und vergleichst die Hashs mit den Passwörtern
    - Wenn die Passwörter schwach sind, wirst du die meisten Konten knacken!

    - Das nennt man einen Brute-Force-Angriff
        - Sehr langsam, Geschwindigkeit hängt von der Passwortkomplexität und der Computerleistung ab
        - Starkes Passwort + guter Algorithmus könnte Millionen von Jahren zum Knacken brauchen
        - Aber es _wird_ schließlich funktionieren

- Auf jeden Fall können auch gehashte Passwörter geknackt werden!
    - Du solltest dein Passwort manchmal ändern


## Zusammenfassung

- Verschlüsselung ist umkehrbar
- Hashing ist nicht umkehrbar
- Passwörter sollten gehasht werden

