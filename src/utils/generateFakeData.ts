import { faker } from '@faker-js/faker';

const generateISBN = (): string => {
  const group1 = '978';
  const group2 = faker.number.int({ min: 100, max: 999 });
  const group3 = faker.number.int({ min: 1000, max: 9999 });
  const group4 = faker.number.int({ min: 10, max: 99 });
  const group5 = faker.number.int({ min: 0, max: 9 });

  return `${group1}-${group2}-${group3}-${group4}-${group5}`;
};

export const generateFakeData = (language: string, count: number) => {
  const fakeData = [];

  for (let i = 0; i < count; i++) {
    const bookTitle = faker.lorem.words(3);
    let author = faker.person.fullName();
    const year = faker.number.int({ min: 1950, max: 2024 });
    const publisher = faker.company.name();
    const isbn = generateISBN();

    if (language === 'French (FR)') {
      author = faker.person.fullName();
    } else if (language === 'Spanish (ES)') {
      author = faker.person.fullName();
    }

    fakeData.push({
      index: i + 1,
      isbn,
      title: bookTitle,
      author,
      publisher,
      year,
    });
  }

  return fakeData;
};
