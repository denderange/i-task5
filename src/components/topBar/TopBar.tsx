'use client';
import {
  Box,
  Text,
  Group,
  NativeSelect,
  Slider,
  NumberInput,
  Button,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Shuffle } from 'lucide-react';
import axios from 'axios';
import { useUserSettingsStore } from '../../store/store';

const TopBar = () => {
  const initialSeed = '12345'; // I suppose it should be equal userId...
  const initialPage = 1;
  // const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const baseURL = 'https://i-task5.vercel.app';

  const { language, setLanguage, likes, setLikes, reviews, setReviews } =
    useUserSettingsStore();

  const [seedValue, setSeedValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const fetchSeed = async (userSeed: string, pageNumber: number) => {
    setLoading(true);

    try {
      const response = await axios.get(`${baseURL}/api/generate-seed`, {
        params: { userSeed, pageNumber },
      });
      setSeedValue(response.data.seed);
    } catch (error) {
      console.error('Error get seed number', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    fetchSeed(initialSeed, initialPage);
  };

  useEffect(() => {
    fetchSeed(initialSeed, initialPage);
  }, []);

  return (
    <Group p={'20'} mb={'10'} bg="white" justify="space-between" grow>
      <Box>
        <Text size="xs" c={'gray.6'}>
          Language
        </Text>
        <NativeSelect
          value={language}
          onChange={(event) => setLanguage(event.currentTarget.value)}
          data={['English (US)', 'French (FR)', 'Spanish (ES)']}
        />
      </Box>

      <Box>
        <Text size="xs" c={'gray.6'}>
          Seed
        </Text>
        <Group
          justify="space-between"
          bd={'1px solid gray.4'}
          style={{ borderRadius: '5px' }}
          py={2}
          pr={2}
        >
          <Text pl={10} pt={5}>
            {loading ? 'Loading...' : seedValue ?? '---'}
          </Text>
          <Button
            variant="default"
            size="compact-md"
            onClick={handleRegenerate}
          >
            <Shuffle />
          </Button>
        </Group>
      </Box>

      <Box>
        <Slider
          color="teal.7"
          value={likes}
          min={0}
          max={10}
          step={0.1}
          onChange={setLikes}
          size={'md'}
          mt={'md'}
        />
        <Text size="sm">
          Likes: <b>{likes}</b>
        </Text>
      </Box>

      <Box>
        <Text size="xs" c={'gray.6'}>
          Reviews
        </Text>
        <NumberInput
          stepHoldDelay={500}
          min={0}
          step={0.1}
          defaultValue={0}
          decimalScale={1}
          stepHoldInterval={100}
          allowNegative={false}
          ref={ref}
          value={reviews}
          onChange={(value) => {
            if (typeof value === 'number') {
              setReviews(value);
              if (ref.current) ref.current.value = value.toString();
            }
          }}
        />
      </Box>
    </Group>
  );
};

export default TopBar;
