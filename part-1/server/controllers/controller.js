const bcrypt = require(`bcryptjs`)
const users = require(`./users`)
const register = (req, res) => {
    const { username, password, ...otherProperties } = req.body;
  
 
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          
          const newUser = {
            username,
            password: hash,
            ...otherProperties,
          };
          users.push(newUser);
          res.status(200).json({ message: 'User registered successfully' });
        }
      });
    });
  };
  const login = (req, res) => {
    const { username, password } = req.body;
  
   
    const user = users.find((user) => user.username === username);
  
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else if (!isMatch) {
          res.status(401).json({ error: 'Invalid password' });
        } else {
          
          const userCopy = { ...user };
          delete userCopy.password;
          res.status(200).json(userCopy);
        }
      });
    }
  };
  
  const substitutionMapping = {
    'A': 'Z',
    'B': 'X',
    'C': 'Y',
    'D': 'W',
    'E': 'V',
    'F': 'U',
    'G': 'T',
    'H': 'S',
    'I': 'R',
    'J': 'Q',
    'K': 'P',
    'L': 'O',
    'M': 'N',
    'N': 'M',
    'O': 'L',
    'P': 'K',
    'Q': 'J',
    'R': 'I',
    'S': 'H',
    'T': 'G',
    'U': 'F',
    'V': 'E',
    'W': 'D',
    'X': 'B',
    'Y': 'C',
    'Z': 'A',
  };
  
  function encipher(plaintext) {
    let cipheredText = '';
    for (let i = 0; i < plaintext.length; i++) {
      const char = plaintext[i];
      if (char.toUpperCase() in substitutionMapping) {
        const substitutionChar = substitutionMapping[char.toUpperCase()];
        cipheredText += char === char.toUpperCase()
          ? substitutionChar.toUpperCase()
          : substitutionChar.toLowerCase();
      } else {
        cipheredText += char;
      }
    }
    return cipheredText;
  }
  
  function decipher(cipheredText) {
    let decipheredText = '';
    for (let i = 0; i < cipheredText.length; i++) {
      const char = cipheredText[i];
      if (char.toUpperCase() in substitutionMapping) {
        const substitutionChar = substitutionMapping[char.toUpperCase()];
        decipheredText += char === char.toUpperCase()
          ? substitutionChar.toUpperCase()
          : substitutionChar.toLowerCase();
      } else {
        decipheredText += char;
      }
    }
    return decipheredText;
  }
  
  const plaintext = "I love cryptography!";
  const cipheredText = encipher(plaintext);
  const decipheredText = decipher(cipheredText);
  
  console.log("Ciphered phrase:", cipheredText);
  console.log("Deciphered phrase:", decipheredText);
  