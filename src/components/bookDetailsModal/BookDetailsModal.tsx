'use client';
import {
  Modal,
  Box,
  Text,
  Button,
  Image,
  Grid,
  GridCol,
  Title,
  Group,
  Divider,
} from '@mantine/core';
import type { Book } from '@/types/types';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

type BookDetailsModalProps = {
  book: Book | null;
  opened: boolean;
  onClose: () => void;
};

const BookDetailsModal = ({ book, opened, onClose }: BookDetailsModalProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [reviews, setReviews] = useState<{ name: string; text: string }[]>([]);

  useEffect(() => {
    if (opened) {
      setImageUrl(faker.image.urlPicsumPhotos({ width: 300, height: 400 }));
      setDescription(faker.lorem.paragraph());

      const reviewCount = faker.number.int({ min: 0, max: 10 });
      const newReviews = Array.from({ length: reviewCount }, () => ({
        name: faker.person.fullName(),
        text: faker.lorem.sentence(),
      }));

      setReviews(newReviews);
    }
  }, [opened]);

  if (!book) return null;

  return (
    <Modal opened={opened} onClose={onClose} size="lg">
      <Box>
        <Grid>
          <GridCol span={4}>
            <Image
              src={imageUrl}
              alt="Book Cover"
              width={'100%'}
              height={200}
              radius="md"
            />
          </GridCol>
          <GridCol span={8} mb={'sm'}>
            <Title
              order={3}
              ta={'center'}
              mb={'lg'}
              tt={'capitalize'}
              c={'teal.8'}
            >
              {book.title}
            </Title>
            <Text>
              <b>Author:</b> {book.author}
            </Text>
            <Text>
              <b>ISBN:</b> {book.isbn}
            </Text>
            <Text>
              <b>Publisher:</b> {book.publisher}
            </Text>
            <Text>
              <b>Year:</b> {book.year}
            </Text>
            <Text>
              <b>Reviews:</b> {reviews.length}
            </Text>
          </GridCol>
        </Grid>
        <Group>
          <Divider />
          <Text>{description}</Text>

          <Divider my="md" />

          <Box>
            {reviews.slice(0, 2).map((review, index) => (
              <Box key={index} mb={'sm'}>
                <Text fw={700} size={'xs'} c={'cyan.9'}>
                  {review.name}:
                </Text>
                <Text c={'gray.7'}>
                  <i>"{review.text}"</i>
                </Text>
              </Box>
            ))}
          </Box>

          {reviews.length === 0 && <Text c={'gray.8'}>No reviews yet.</Text>}
        </Group>
      </Box>
      <Button fullWidth mt="md" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

export default BookDetailsModal;
