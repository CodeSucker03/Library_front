import { useState } from 'react';

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <select
        name="language"
        id="language"
        className="rounded-full p-2"
        value={selectedLanguage}  // Controlled component using value
        onChange={handleChange}
      >
        <option value="" disabled>
          Language
        </option>
        <option value="English">English</option>
        <option value="python">Python</option>
        <option value="c++">C++</option>
        <option value="java">Java</option>
      </select>

      <p>Selected Language: {selectedLanguage}</p>
    </div>
  );
}

export default LanguageSelector;
    