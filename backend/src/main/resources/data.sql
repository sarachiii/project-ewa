INSERT INTO greenhouse (id, CO2_level) VALUES
(2, 0),
(3, 0);

-- --------------------------------------------------------

INSERT INTO team (id, gh_id) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2);

-- --------------------------------------------------------

INSERT INTO history (timestamp, gh_id, air_temp_c, air_humidity, soil_temp_c, soil_humidity, soil_mix_id, water_ph, water_mix_id, lighting_rgb, daily_exposure, CO2_level) VALUES
('2021-12-21 20:33:04', 2, 11, 12, 21, 41, 1, 3, 1, '#dddfff', 1, 901.2),
('2021-12-21 20:33:20', 2, 11, 12, 21, 0, 1, 3, 1, '#dddfff', 1, 901.2),
('2021-12-21 20:33:50', 3, 11, 12, 21, 0, 1, 3, 1, '#dddfff', 1, 901.2),
('2021-12-26 14:51:05', 2, 26, 87.99, 19, 82, 19, 7.8, 19, '#fcfcfc', 13, 1052.99),
('2021-12-26 14:51:09', 2, 26, 87.99, 19, 82, 19, 7.8, 19, '#fcfcfc', 13, 1052.99),
('2021-12-26 14:51:14', 2, 26, 87.99, 19, 82, 19, 7.8, 19, '#fcfcfc', 13, 1052.99),
('2021-12-27 14:20:25', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6),
('2021-12-27 14:21:19', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6),
('2021-12-27 14:22:19', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6),
('2021-12-27 14:23:19', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6),
('2021-12-27 14:24:19', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6),
('2021-12-27 14:25:19', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6),
('2021-12-27 14:26:19', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6),
('2021-12-27 14:27:19', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6),
('2021-12-27 14:28:19', 2, 20, 50, 15, 50, 12, 5, 22, '#ffffff', 13, 1079.6);

-- --------------------------------------------------------

INSERT INTO "user" (id, team_id, role, specialty, first_name, last_name, email, password, image_path) VALUES
(1, 1, 'SUPER_ADMIN', 'Botany', 'Sjors', 'Peters', 'sjors.peters@climatecleanup.org', '$2a$10$M1bS187a6ycBhDMco0DUTuEVa14JM9Ob3dleYrdNMJp3zQaXT9mY6', 'https://ccufs0st0.blob.core.windows.net/content/users/1/avatar/40b06651-2bbc-4137-a93e-ae5778b5eb18.jpg'),
(2, 1, 'MEMBER', 'Climate_Science', 'Janet', 'van Koningsbrugge', 'Janet.v.Koningsbrugge@climatecleanup.org', '$2a$10$mlWGMAMkdqVQH5nkl1oOS./sv0aYjX/aqEw02p1NgqD/d6KDE.iYu', 'https://ccufs0st0.blob.core.windows.net/content/users/2/avatar/aee3613f-df1a-4dfa-bb91-fc93c03a03db.jpeg'),
(3, 1, 'MEMBER', 'Geology', 'Geert', 'van Beek', 'Geert.v.Beek@climatecleanup.org', '$2a$10$UY8h3sXQmigI5XxYqgoUU.79tGiGUzWs8Rd5oB4.leWZ3CvS7/KKu', 'https://ccufs0st0.blob.core.windows.net/content/users/3/avatar/d4d50d24-f8c6-4093-bf1f-490b7e6b7d1d.jpeg'),
(4, 1, 'MEMBER', 'Agronomy', 'Yahia', 'Elsherbini', 'y.elsherbini@ccu.org', '$2a$10$prDn6takNoCZy8HJxEIgdudVQ1Z/j2XhRGiv5v/lwa.9Y/gHzyWoW', NULL),
(5, 1, 'MEMBER', 'Hydrology', 'Andy', 'Dockett', 'a.dockett@ccu.org', '$2a$10$Bl78iQzLTto18Dq28hyBcOxDAg4CWjNRRRMuuGbNINz1ImefV9tDu', NULL),
(6, 1, 'ADMIN', 'Botany', 'Brian', 'Reardon', 'b.reardon@ccu.org', '$2a$10$RPyVLWJCKHB42KKyKSDzH.35XJuFalgYJbZcBt66oD283cYUCVQhu', NULL),
(7, 1, 'MEMBER', 'Agronomy', 'Marcio', 'Fuckner', 'm.fuckner@ccu.org', '$2a$10$d5iRH4buHvt0lA3sngkkv.GYj7HZWlPL8iPPd9.qJVonMK76m5jTW', NULL),
(8, 2, 'MEMBER', 'Agronomy', 'Nuha', 'Mckenna', 'nuha.mckenna@gmail.com', '$2a$10$wJgjTUTOwXSLHl2jtzMIe.0Hb.u5hvOPzv9gP2cxOF4FW3gEcqKlW', NULL),
(9, 2, 'MEMBER', 'Botany', 'Ceri', 'Mcleod', 'ceri.mcleod@gmail.com', '$2a$10$gsalWA8ECBZCc8O8rWD.hOsktep8EHmsFFbv38lh4GvOBCOWDfSdm', NULL),
(10, 2, 'MEMBER', 'Geology', 'Israel', 'Flower', 'israel.flower@gmail.com', '$2a$10$hSgili2Hxs04mC9kYxqj1uTlDNNPPUwt1kLH/vuQCCT40FOghaPtO', NULL),
(11, 2, 'MEMBER', 'Hydrology', 'Elisa', 'Garcia', 'elisa.garcia@ccu.org', '$2a$10$2dL2QUDRbS7sLVJgDEvf4uNZvjpOgA.b56yG59CSMNdGNdv/8mGkC', 'https://ccufs0st0.blob.core.windows.net/content/users/11/avatar/b1f002d3-37cb-43fc-8fbf-5c32b0ce467c.jfif'),
(12, 2, 'MEMBER', 'Climate_Science', 'Arfa', 'Archer', 'arfa.archer@ccu.org', '$2a$10$izlHNTaJ5JBQ1iMOxBxI2Ozcu2UQMG0Cc8SkGmBAn2Wzvp46qhmYK', NULL),
(13, 2, 'ADMIN', 'Agronomy', 'Vikkie', 'Curtis', 'vikkie.curtis@ccu.org', '$2a$10$j1xowP0KcpqVJbI2Bj/tWOiQJOjSkk148xm1b/JQujJJe9oLmaJxy', NULL),
(15, 3, 'MEMBER', 'Agronomy', 'Joss', 'Edmonds', 'joss.edmonds@ccu.org', '$2a$10$0rY9858UEFEb.o92glYp4efhdN46Bu5//T70mdJ3wIIgzyuPSgNkO', 'https://ccufs0st0.blob.core.windows.net/content/users/15/avatar/5e86aac7-7f78-4cba-baaa-82ec101bb83d.jfif'),
(16, 3, 'MEMBER', 'Botany', 'Alaya', 'Potts', 'alaya.potts@ccu.org', '$2a$10$Sz08eamiJh0mOFV55y7yzuOoMpEJbWwO8L3QKuk8ULbO09COXL09K', 'https://ccufs0st0.blob.core.windows.net/content/users/16/avatar/90a8cf77-5f67-4621-9eb4-2b2552472a21.jfif'),
(19, 3, 'MEMBER', 'Climate_Science', 'Tamar', 'Barnard', 'tamar.barnard@ccu.org', '$2a$10$kWK7mhSnOpIeVvQFo0CC9eot86uYTBE9jSsdV.dy5i.HhCh1KR3r2', NULL),
(53, 1, 'MEMBER', 'Agronomy', 'Jechillo', 'Huang', 'jechillo.huang@hva.nl', '$2a$10$qG2MIHz7SM6IYDgn9dFDOePwDcAO4cJKiSa3tsBBS.C4FrLFUuLke', '');


-- --------------------------------------------------------

INSERT INTO note (id, timestamp, title, content, user_id) VALUES
(1, '2021-11-09 14:01:28', 'CO2 level', 'CO2 level seems to be consistent', 7),
(2, '2021-11-13 19:55:00', 'Heat wave', 'The sudden change in weather made the temperature rise at the greenhouse causing an increase in the CO2 level.', 1),
(3, '2021-11-12 22:38:49', 'Temperature changes', 'CO2 level decreased, after the temparature changed.', 4),
(4, '2021-11-13 14:17:55', 'Changed the lighting color', 'The lighting color is changed from white to yellow but it did not effect the CO2 level.', 1),
(5, '2021-11-15 20:47:31', 'Dehydration', 'The plants are dying', 7),
(6, '2021-11-20 23:25:18', 'Malfunctioning sensors', 'All the data from 19-11-2021 is not correct.', 7),
(7, '2021-11-22 10:39:52', 'CO2 Level', 'CO2 level seems to be consistent.', 2),
(8, '2021-11-21 10:56:01', 'The electricity was cut off.', 'The sensors went out, because there was no electricity. So there is no data from November 21.', 3);

-- --------------------------------------------------------

INSERT INTO sensor (id, name, min_value, max_value, min_warning_value, max_warning_value) VALUES
(1, 'air_temp_c', 10, 40, 15, 35),
(2, 'air_humidity', 12, 99, 15, 90),
(3, 'soil_temp_c', 10, 40, 15, 35),
(4, 'soil_humidity', 12, 99, 15, 90),
(5, 'soil_mix_id', 1, 10000, 1, 10000),
(6, 'water_ph', 5, 8, 5.5, 7.5),
(7, 'water_mix_id', 1, 10000, 1, 10000),
(8, 'lighting_rgb', 0, 16777215, 0, 16777215),
(9, 'daily_exposure', 1, 24, 2, 23);

-- --------------------------------------------------------

INSERT INTO sensor_data (timestamp, gh_id, sensor_id, value, user_id) VALUES
('2021-12-31 21:59:26', 2, 1, 19, 1),
('2021-12-31 21:59:26', 2, 2, 88.99, 1),
('2021-12-31 21:59:26', 2, 3, 22, 1),
('2021-12-31 21:59:26', 2, 4, 82, 1),
('2021-12-31 21:59:26', 2, 5, 50, 1),
('2021-12-31 21:59:26', 2, 6, 7.8, 1),
('2021-12-31 21:59:26', 2, 7, 19, 1),
('2021-12-31 21:59:26', 2, 8, 15654274, 1),
('2021-12-31 21:59:26', 2, 9, 23, 1),
('2021-12-31 22:01:02', 2, 1, 20, 1),
('2021-12-31 22:01:02', 2, 2, 88.99, 1),
('2021-12-31 22:01:02', 2, 3, 22, 1),
('2021-12-31 22:01:02', 2, 4, 82, 1),
('2021-12-31 22:01:02', 2, 5, 50, 1),
('2021-12-31 22:01:02', 2, 6, 7.8, 1),
('2021-12-31 22:01:02', 2, 7, 19, 1),
('2021-12-31 22:01:02', 2, 8, 15654274, 1),
('2021-12-31 22:01:02', 2, 9, 23, 1),
('2021-12-31 22:01:55', 2, 1, 20, 1),
('2021-12-31 22:01:55', 2, 2, 88.99, 1),
('2021-12-31 22:01:55', 2, 3, 22, 1),
('2021-12-31 22:01:55', 2, 4, 82, 1),
('2021-12-31 22:01:55', 2, 5, 50, 1),
('2021-12-31 22:01:55', 2, 6, 7.8, 1),
('2021-12-31 22:01:55', 2, 7, 19, 1),
('2021-12-31 22:01:55', 2, 8, 15654274, 1),
('2021-12-31 22:01:55', 2, 9, 23, 1),
('2021-12-31 22:02:08', 2, 1, 21, 1),
('2021-12-31 22:02:08', 2, 2, 88.99, 1),
('2021-12-31 22:02:08', 2, 3, 22, 1),
('2021-12-31 22:02:08', 2, 4, 82, 1),
('2021-12-31 22:02:08', 2, 5, 50, 1),
('2021-12-31 22:02:08', 2, 6, 7.8, 1),
('2021-12-31 22:02:08', 2, 7, 19, 1),
('2021-12-31 22:02:08', 2, 8, 15654274, 1),
('2021-12-31 22:02:08', 2, 9, 23, 1),
('2021-12-31 22:07:25', 2, 1, 22, 1),
('2021-12-31 22:07:25', 2, 2, 88.99, 1),
('2021-12-31 22:07:25', 2, 3, 22, 1),
('2021-12-31 22:07:25', 2, 4, 82, 1),
('2021-12-31 22:07:25', 2, 5, 50, 1),
('2021-12-31 22:07:25', 2, 6, 7.8, 1),
('2021-12-31 22:07:25', 2, 7, 19, 1),
('2021-12-31 22:07:25', 2, 8, 15654274, 1),
('2021-12-31 22:07:25', 2, 9, 23, 1),
('2021-12-31 22:07:41', 2, 1, 23, 1),
('2021-12-31 22:07:41', 2, 2, 88.99, 1),
('2021-12-31 22:07:41', 2, 3, 22, 1),
('2021-12-31 22:07:41', 2, 4, 82, 1),
('2021-12-31 22:07:41', 2, 5, 50, 1),
('2021-12-31 22:07:41', 2, 6, 7.8, 1),
('2021-12-31 22:07:41', 2, 7, 19, 1),
('2021-12-31 22:07:41', 2, 8, 15654274, 1),
('2021-12-31 22:07:41', 2, 9, 23, 1),
('2021-12-31 22:07:55', 2, 1, 24, 1),
('2021-12-31 22:07:55', 2, 2, 88.99, 1),
('2021-12-31 22:07:55', 2, 3, 22, 1),
('2021-12-31 22:07:55', 2, 4, 82, 1),
('2021-12-31 22:07:55', 2, 5, 50, 1),
('2021-12-31 22:07:55', 2, 6, 7.8, 1),
('2021-12-31 22:07:55', 2, 7, 19, 1),
('2021-12-31 22:07:55', 2, 8, 15654274, 1),
('2021-12-31 22:07:55', 2, 9, 23, 1),
('2021-12-31 22:08:07', 2, 1, 23, 1),
('2021-12-31 22:08:07', 2, 2, 88.99, 1),
('2021-12-31 22:08:07', 2, 3, 22, 1),
('2021-12-31 22:08:07', 2, 4, 82, 1),
('2021-12-31 22:08:07', 2, 5, 50, 1),
('2021-12-31 22:08:07', 2, 6, 7.8, 1),
('2021-12-31 22:08:07', 2, 7, 19, 1),
('2021-12-31 22:08:07', 2, 8, 15654274, 1),
('2021-12-31 22:08:07', 2, 9, 23, 1),
('2022-01-02 14:45:48', 2, 1, 25, 1),
('2022-01-02 14:45:48', 2, 2, 88.99, 1),
('2022-01-02 14:45:48', 2, 3, 22, 1),
('2022-01-02 14:45:48', 2, 4, 82, 1),
('2022-01-02 14:45:48', 2, 5, 50, 1),
('2022-01-02 14:45:48', 2, 6, 7.8, 1),
('2022-01-02 14:45:48', 2, 7, 19, 1),
('2022-01-02 14:45:48', 2, 8, 15654274, 1),
('2022-01-02 14:45:48', 2, 9, 23, 1),
('2022-01-02 14:54:39', 2, 1, 27, 1),
('2022-01-02 14:54:39', 2, 2, 88.99, 1),
('2022-01-02 14:54:39', 2, 3, 22, 1),
('2022-01-02 14:54:39', 2, 4, 82, 1),
('2022-01-02 14:54:39', 2, 5, 50, 1),
('2022-01-02 14:54:39', 2, 6, 7.8, 1),
('2022-01-02 14:54:39', 2, 7, 19, 1),
('2022-01-02 14:54:39', 2, 8, 15654274, 1),
('2022-01-02 14:54:39', 2, 9, 23, 1);

-- --------------------------------------------------------

INSERT INTO settings (user_id, language, colorblindness, dark_mode) VALUES
(1, 'en_GB', false, false),
(2, 'en_GB', false, false),
(3, 'en_GB', false, false),
(4, 'en_GB', false, false),
(5, 'en_GB', false, false),
(6, 'en_GB', false, false),
(7, 'en_GB', false, false),
(8, 'en_GB', false, false),
(9, 'en_GB', false, false),
(10, 'en_GB', false, false),
(11, 'en_GB', false, false),
(12, 'en_GB', false, false),
(13, 'en_GB', false, false),
(15, 'en_GB', false, false),
(16, 'en_GB', false, false),
(19, 'en_GB', false, false),
(53, 'en_GB', false, false);


