'use client'
import React, { useState, useEffect } from 'react';
import { listBlobs, searchBlobs } from '@/services/s3Service';
import styles from '@/styles/Videos.module.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const blobs = await listBlobs();
        console.log('Fetched videos:', blobs);
        setVideos(blobs);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  const handleSearch = async () => {
    try {
      const blobs = await searchBlobs(query);
      setVideos(blobs);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
        placeholder="Search for videos..."
      />
      <button onClick={handleSearch} className={styles.searchButton}>Search</button>
      <ul className={styles.videoList}>
        {videos.map((video) => (
          <li key={video.name} className={styles.videoItem}>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className={styles.videoName}>{video.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Videos;