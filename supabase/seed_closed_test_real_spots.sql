-- クローズドテスト向けの実在スポット。
-- Supabase の SQL Editor で実行する。架空スポットとクーポンを消し、公開情報の場所だけを入れ直す。
-- 提携の了承がない店の割引は入れない。クーポンは空のままにする。
-- 写真は Unsplash の参考画像で、各店の公式写真ではない。
-- 再実行すると spots / coupons / それに紐づくお気に入り・口コミ・プラン明細を消して入れ直す。

delete from public.user_coupons_history;
delete from public.coupons;
delete from public.plan_spots;
delete from public.reviews;
delete from public.favorites;
delete from public.spots;

insert into public.spots (
  id,
  name,
  lat,
  lng,
  category,
  time_recommended,
  relationship_tags,
  is_partner_store,
  image_url,
  area,
  description,
  created_at
) values
(
  '20000000-0000-4000-8000-000000000001',
  '代官山 蔦屋書店',
  35.648888,
  139.699761,
  'cafe'::public.spot_category,
  'day'::public.time_recommended,
  array['first_date', 'new_couple']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
  '代官山',
  '東京都渋谷区猿楽町17-5。書店と一体のカフェがある。営業時間と席は店舗の案内を確認する。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-000000000002',
  'スターバックス リザーブ ロースタリー 東京',
  35.649206,
  139.692586,
  'cafe'::public.spot_category,
  'both'::public.time_recommended,
  array['first_date', 'more_than_friends']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
  '中目黒',
  '東京都目黒区青葉台2-19-23。中目黒駅から徒歩約14分。混雑時は整理券になる。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-000000000003',
  'ブルーボトルコーヒー 清澄白河ロースタリー',
  35.6822,
  139.7995,
  'cafe'::public.spot_category,
  'day'::public.time_recommended,
  array['first_date', 'new_couple']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=80',
  '清澄白河',
  '東京都江東区平野1-4-1。清澄白河の焙煎所併設カフェ。営業時間は店舗の案内を確認する。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-000000000004',
  '目黒川（中目黒）',
  35.6442,
  139.6986,
  'activity'::public.spot_category,
  'both'::public.time_recommended,
  array['first_date', 'new_couple', 'long_term']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&q=80',
  '中目黒',
  '中目黒駅そばの川沿い。桜の季節は混む。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-000000000005',
  '東京タワー',
  35.658581,
  139.745433,
  'night_view'::public.spot_category,
  'night'::public.time_recommended,
  array['first_date', 'new_couple']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&q=80',
  '芝公園',
  '東京都港区芝公園4-2-8。展望台は別料金。営業時間は公式案内を確認する。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-000000000006',
  '東京スカイツリー',
  35.710063,
  139.8107,
  'night_view'::public.spot_category,
  'both'::public.time_recommended,
  array['first_date', 'new_couple', 'long_term']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
  '押上',
  '東京都墨田区押上1-1-2。展望とソラマチの食事が同じ場所でできる。営業時間は公式案内を確認する。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-000000000007',
  '渋谷スカイ',
  35.6584,
  139.702,
  'night_view'::public.spot_category,
  'night'::public.time_recommended,
  array['first_date', 'new_couple']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=80',
  '渋谷',
  '東京都渋谷区渋谷2-24-12 渋谷スクランブルスクエア。屋外展望台。日時指定のチケットが必要なことがある。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-000000000008',
  '六本木ヒルズ',
  35.6605,
  139.7292,
  'night_view'::public.spot_category,
  'night'::public.time_recommended,
  array['new_couple', 'long_term']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1554797589-7241bb691973?w=1200&q=80',
  '六本木',
  '東京都港区六本木6-10-1。展望台と食事が同じ敷地にある。各店の営業時間は店舗ごとの案内を確認する。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-000000000009',
  'チームラボプラネッツ TOKYO',
  35.6494,
  139.7899,
  'activity'::public.spot_category,
  'both'::public.time_recommended,
  array['first_date', 'new_couple']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=80',
  '豊洲',
  '東京都江東区豊洲6-1-16。日時指定チケットが必要。足元が濡れる展示がある。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-00000000000a',
  'お台場海浜公園',
  35.63,
  139.7753,
  'activity'::public.spot_category,
  'both'::public.time_recommended,
  array['first_date', 'new_couple', 'long_term']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&q=80',
  'お台場',
  '東京都港区台場1丁目。レインボーブリッジが見える海沿い。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-00000000000b',
  '新宿御苑',
  35.6852,
  139.71,
  'activity'::public.spot_category,
  'day'::public.time_recommended,
  array['first_date', 'long_term']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=80',
  '新宿御苑',
  '東京都新宿区内藤町11。入園料がかかる。月曜休園などの休園日は公式案内を確認する。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-00000000000c',
  '浅草寺',
  35.7148,
  139.7967,
  'activity'::public.spot_category,
  'day'::public.time_recommended,
  array['first_date', 'new_couple', 'long_term']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80',
  '浅草',
  '東京都台東区浅草2-3-1。仲見世で食べ歩きができる。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-00000000000d',
  '恵比寿ガーデンプレイス',
  35.6423,
  139.7132,
  'dinner'::public.spot_category,
  'both'::public.time_recommended,
  array['new_couple', 'long_term']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  '恵比寿',
  '東京都渋谷区恵比寿4-20。複数の店が入る施設。個別の店の予約と営業時間は各店の案内を確認する。写真は公式画像ではない。',
  timezone('utc', now())
),
(
  '20000000-0000-4000-8000-00000000000e',
  '神楽坂通り',
  35.7015,
  139.7406,
  'dinner'::public.spot_category,
  'night'::public.time_recommended,
  array['first_date', 'new_couple', 'long_term']::public.relationship_status[],
  false,
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  '神楽坂',
  '東京都新宿区神楽坂。石畳の飲食店街で、店はその場で選ぶ。写真は公式画像ではない。',
  timezone('utc', now())
);
