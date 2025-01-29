'use client';
import {
  Box,
  Text,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Button,
} from '@mantine/core';
import { Table } from '@mantine/core';
import { generateFakeData } from '@/utils/generateFakeData';
import { useEffect, useState } from 'react';
import type { Book } from '@/types/types';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/utils/exportToCSV';
import BookDetailsModal from '../bookDetailsModal/BookDetailsModal';

const BooksTable = () => {
  const [language, setLanguage] = useState('English (US)');
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadData = () => {
    setLoading(true);
    const newData = generateFakeData(language, 20).map((item, index) => ({
      ...item,
      index: currentIndex + index,
    }));
    setData(newData);
    setCurrentIndex(currentIndex + newData.length);
    setLoading(false);
  };

  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);
    const newData = generateFakeData(language, 10).map((item, index) => ({
      ...item,
      index: currentIndex + index,
    }));
    setTimeout(() => {
      setData((prevData) => [...prevData, ...newData]);
      setCurrentIndex(currentIndex + newData.length);
      setLoading(false);
    }, 500);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreData();
    }
  };

  const handleExport = () => {
    const csvData = data.map((item) => ({
      '#': item.index,
      ISBN: item.isbn,
      Title: item.title,
      Author: item.author,
      Publisher: `${item.publisher} (${item.year})`,
    }));

    exportToCSV(csvData, 'books');
  };

  const handleRowClick = (book: Book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  useEffect(() => {
    loadData();
  }, [language]);

  const rows = data.map((item) => (
    <TableTr
      key={item.index}
      onClick={() => handleRowClick(item)}
      style={{ cursor: 'pointer' }}
    >
      <TableTd>{item.index}</TableTd>
      <TableTd>{item.isbn}</TableTd>
      <TableTd tt={'capitalize'}>{item.title}</TableTd>
      <TableTd>{item.author}</TableTd>
      <TableTd>
        {item.publisher} ({item.year})
      </TableTd>
    </TableTr>
  ));

  return (
    <div>
      <Box
        bg="white"
        px={'20'}
        mb={'md'}
        style={{
          height: '600px',
          overflowY: 'auto',
        }}
        onScroll={handleScroll}
      >
        <Table stickyHeader stickyHeaderOffset={0} highlightOnHover>
          <TableThead bg={'teal.1'}>
            <TableTr>
              <TableTh>#</TableTh>
              <TableTh>ISBN</TableTh>
              <TableTh>Title</TableTh>
              <TableTh>Author</TableTh>
              <TableTh>Publisher</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>{rows}</TableTbody>
        </Table>
        {loading && <Text>Loading...</Text>}
      </Box>
      <Button rightSection={<Download size={14} />} onClick={handleExport}>
        Export CSV
      </Button>

      <BookDetailsModal
        book={selectedBook}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default BooksTable;
