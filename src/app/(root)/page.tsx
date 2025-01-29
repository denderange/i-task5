import BooksTable from '@/components/booksTable/BooksTable';
import TopBar from '@/components/topBar/TopBar';
import { Container } from '@mantine/core';

export default function Home() {
  return (
    <Container size="lg" p={0}>
      <TopBar />
      <BooksTable />
    </Container>
  );
}
