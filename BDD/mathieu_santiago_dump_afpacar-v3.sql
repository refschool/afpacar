-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 04, 2021 at 11:38 AM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `afpacar-v3`
--

-- --------------------------------------------------------

--
-- Table structure for table `ad`
--

CREATE TABLE `ad` (
  `id_ad` int(11) NOT NULL,
  `id_user__writer` int(11) NOT NULL,
  `id_address__start` int(11) DEFAULT NULL,
  `id_address__end` int(11) DEFAULT NULL,
  `is_driver_ad` tinyint(1) NOT NULL,
  `content_ad` text NOT NULL,
  `datetime_creation_ad` datetime NOT NULL,
  `date_start_ad` date NOT NULL,
  `date_end_ad` date NOT NULL,
  `are_smokers_allowed_ad` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Default: false',
  `is_luggage_allowed_ad` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Default: false',
  `are_disabled_people_allowed_ad` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Default: false',
  `status_report_ad` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Default: to moderate',
  `subject_report_ad` varchar(50) DEFAULT NULL COMMENT 'Default: NULL',
  `reason_report_ad` varchar(250) DEFAULT NULL COMMENT 'Default: NULL',
  `comment_start_address_ad` varchar(250) DEFAULT NULL COMMENT 'Default: NULL',
  `comment_end_address_ad` varchar(250) DEFAULT NULL COMMENT 'Default: NULL',
  `is_active_ad` tinyint(1) NOT NULL COMMENT 'Default: true'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ad`
--

INSERT INTO `ad` (`id_ad`, `id_user__writer`, `id_address__start`, `id_address__end`, `is_driver_ad`, `content_ad`, `datetime_creation_ad`, `date_start_ad`, `date_end_ad`, `are_smokers_allowed_ad`, `is_luggage_allowed_ad`, `are_disabled_people_allowed_ad`, `status_report_ad`, `subject_report_ad`, `reason_report_ad`, `comment_start_address_ad`, `comment_end_address_ad`, `is_active_ad`) VALUES
(1, 5, 8, NULL, 1, 'J\'adore la hardbass, j\'espère que vous aussi', '2021-05-23 10:12:23', '2021-05-23', '2021-06-18', 1, 0, 1, 2, 'Abus', NULL, 'Rdv sur le parking de la boulangerie', NULL, 1),
(2, 7, 6, NULL, 1, 'Bonjour, je vous propose de vous déposer chez vous sur mon trajet retour, le lundi, mercredi et vendredi.\r\n\r\nJe peux aussi vous prendre le jeudi matin mais uniquement à l\'aller.', '2021-05-27 14:53:10', '2021-05-30', '2021-09-24', 0, 1, 1, 0, NULL, NULL, NULL, 'Je suis garé devant le bâtiment B', 1),
(3, 2, 10, NULL, 0, 'Je cherche quelqu\'un qui connait la route par cœur et qui accepte mon bagage (colis suspect).', '2021-04-28 12:16:25', '2021-05-03', '2021-05-07', 0, 1, 0, 1, NULL, NULL, 'Pas de retard svp !', NULL, 1),
(4, 1, 9, NULL, 1, 'Je ne donne pas mon numéro de téléphone. Passion : impression 3D de vélos !', '2021-04-16 11:46:35', '2021-04-19', '2021-04-30', 1, 0, 0, 0, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id_address` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_city` int(11) NOT NULL,
  `address_address` varchar(60) NOT NULL,
  `additional_address_address` varchar(60) DEFAULT NULL,
  `is_main_address` tinyint(1) DEFAULT NULL,
  `is_active_address` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id_address`, `id_user`, `id_city`, `address_address`, `additional_address_address`, `is_main_address`, `is_active_address`) VALUES
(1, NULL, 4, '12 rue Jean Mermoz', NULL, NULL, 0),
(2, NULL, 5, '34 rue de Costesèque', NULL, NULL, 1),
(3, NULL, 6, 'avenue Felix Gouin', NULL, NULL, 1),
(4, NULL, 7, '366 avenue Georges Durand', NULL, NULL, 1),
(5, 4, 8, '20 rue du Luxembourg', NULL, NULL, 1),
(6, 7, 5, '12 rue du PHP King', 'villa \"EnjoyTheCode\"', NULL, 0),
(7, 5, 4, '15 rue de la Mayonnaise', 'rés. \"Les 3 sauces\", appt 12', 0, 1),
(8, 5, 2, '10 rue de Chez Moi', NULL, 1, 1),
(9, 1, 2, '5 rue Loin de Tout', NULL, NULL, 1),
(10, 7, 10, '20 rue de la Fausse adresse', NULL, NULL, 1),
(11, 4, 1, '12 rue du PHP King', 'villa \"EnjoyTheCode\"', 1, 2),
(12, 4, 1, '12 rue du PHP King', 'villa \"EnjoyTheCode\"', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ad__city`
--

CREATE TABLE `ad__city` (
  `id_ad` int(11) NOT NULL,
  `id_city` int(11) NOT NULL,
  `comment_stage` text,
  `index_stage` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Chaque ville correspond à une étape du trajet';

--
-- Dumping data for table `ad__city`
--

INSERT INTO `ad__city` (`id_ad`, `id_city`, `comment_stage`, `index_stage`) VALUES
(2, 9, 'Je peux prendre quelqu\'un devant le McDo vers 7h30', 2),
(2, 10, 'Je peux prendre quelqu\'un sur le parking d\'Intermarché le jeudi vers 7h00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ad__passenger`
--

CREATE TABLE `ad__passenger` (
  `id_ad` int(11) NOT NULL,
  `id_user__passenger` int(11) NOT NULL,
  `datetime_booking_request` datetime DEFAULT NULL,
  `datetime_creation_contract__passenger` datetime DEFAULT NULL,
  `datetime_acceptance_contract__passenger` datetime DEFAULT NULL,
  `price_contract__passenger` float DEFAULT NULL,
  `service_contract__passenger` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ad__passenger`
--

INSERT INTO `ad__passenger` (`id_ad`, `id_user__passenger`, `datetime_booking_request`, `datetime_creation_contract__passenger`, `datetime_acceptance_contract__passenger`, `price_contract__passenger`, `service_contract__passenger`) VALUES
(1, 7, NULL, '2021-05-25 09:18:36', NULL, 4, 'Promener mon chien (Rott weiler affamé)'),
(2, 1, '2021-06-23 15:47:51', NULL, '2021-06-08 08:24:22', NULL, NULL),
(2, 3, NULL, '2021-04-12 15:18:25', '2021-04-12 16:27:04', 19, NULL),
(2, 5, '2021-06-28 10:07:14', NULL, '2021-06-16 08:24:29', NULL, NULL),
(2, 6, '2021-06-28 10:36:50', NULL, '2021-06-02 08:24:32', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `center`
--

CREATE TABLE `center` (
  `id_center` int(11) NOT NULL,
  `id_address` int(11) NOT NULL,
  `label_center` varchar(50) NOT NULL,
  `name_center` varchar(50) NOT NULL,
  `tel_center` varchar(15) DEFAULT NULL,
  `email_center` varchar(80) NOT NULL,
  `hours_center` varchar(500) DEFAULT NULL,
  `url_map_center` varchar(250) DEFAULT NULL,
  `contact_gender_center` char(1) DEFAULT NULL,
  `contact_name_center` varchar(50) DEFAULT NULL,
  `contact_firstname_center` varchar(50) DEFAULT NULL,
  `contact_role_center` varchar(50) DEFAULT NULL,
  `contact_description_center` varchar(250) DEFAULT NULL,
  `contact_email_center` varchar(50) DEFAULT NULL,
  `contact_tel_center` varchar(15) DEFAULT NULL,
  `contact_show_tel_to_public` tinyint(1) DEFAULT NULL COMMENT 'Default: false',
  `is_active_center` tinyint(1) NOT NULL COMMENT 'Default: true'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `center`
--

INSERT INTO `center` (`id_center`, `id_address`, `label_center`, `name_center`, `tel_center`, `email_center`, `hours_center`, `url_map_center`, `contact_gender_center`, `contact_name_center`, `contact_firstname_center`, `contact_role_center`, `contact_description_center`, `contact_email_center`, `contact_tel_center`, `contact_show_tel_to_public`, `is_active_center`) VALUES
(1, 1, 'Centre Afpa de Montpellier St Jean', 'afpa_montpellier_saint_jean', NULL, 'contact_34430@afpa.fr', 'lundi : 	08h00 - 12h30 / 13h30 - 16h00\r\nmardi : 	08h00 - 12h30 / 13h30 - 16h00\r\nmercredi : 	08h00 - 12h30 / 13h30 - 16h00\r\njeudi : 	08h00 - 12h30 / 13h30 - 16h00\r\nvendredi : 	08h00 - 12h30', 'https://fr.mappy.com/poi/5fd60f89aa455b2ae55753e5', 'M', 'DUBOIS', 'René', 'Agent administratif', 'Pour toute visite de centre, M. Dubois est la personne à contacter', 'rene.dubois@afpa.fr', '0638925621', 0, 1),
(2, 2, 'Centre Afpa de Béziers', 'afpa_beziers', NULL, 'contact_34500@afpa.fr', 'lundi : 	08h15 - 12h00 / 13h00 - 16h00\r\nmardi : 	08h15 - 12h00 / 13h00 - 16h00\r\nmercredi : 	08h15 - 12h00 / 13h00 - 16h00\r\njeudi : 	08h15 - 12h00 / 13h00 - 16h00\r\nvendredi : 	08h00 - 12h00', 'https://fr.mappy.com/poi/5d87ff9654c4c060f39df52a', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, 3, 'Centre Afpa d\'Istres', 'afpa_istres', NULL, 'contact_13800@afpa.fr', 'lundi : 	08h00 - 12h00 / 13h15 - 17h15\r\nmardi : 	08h00 - 12h00 / 13h15 - 17h15\r\nmercredi : 	08h00 - 12h00 / 13h15 - 17h15\r\njeudi : 	08h00 - 12h00 / 13h15 - 17h15\r\nvendredi : 	08h00 - 12h00', 'https://www.google.com/maps/search/afpa+istres/@43.4956411,4.9781794,15z/data=!3m1!4b1', 'M', 'Patulacci', 'Robert', 'professeur', 'Enseigne comment devenir un bon agent de la paix avant tout', 'robert.patulacci@afpa.fr', '0608090705', 0, 1),
(4, 4, 'Centre Afpa du Mans', 'afpa_le_mans', NULL, 'contact_72000@afpa.fr', 'lundi : 	08h30 - 12h00 / 13h30 - 17h30\r\nmardi : 	08h30 - 12h00 / 13h30 - 17h30\r\nmercredi : 	08h30 - 12h00 / 13h30 - 17h30\r\njeudi : 	08h30 - 12h00 / 13h30 - 17h30\r\nvendredi : 	08h30 - 12h00 / 13h30 - 15h30', 'https://www.google.com/maps/place/AFPA/@47.9682238,0.2164223,15z/data=!4m2!3m1!1s0x0:0x73bd1ea6b3c84781?sa=X&ved=2ahUKEwjf-pPiz-nwAhU55uAKHfaBABoQ_BIwG3oECE4QBQ', 'W', 'Dupont', 'Charline', 'directrice', NULL, 'charline.dupont@afpa.fr', '0680704132', 0, 1),
(5, 5, 'Centre Afpa de Roubaix', 'afpa_roubaix', NULL, 'contact_59100@afpa.fr', 'lundi : 	08h00 - 12h30 / 13h30 - 17h15\r\nmardi : 	08h00 - 12h30 / 13h30 - 17h15\r\nmercredi : 	08h00 - 12h30 / 13h30 - 17h15\r\njeudi : 	08h00 - 12h30 / 13h30 - 17h15\r\nvendredi : 	08h00 - 12h30', 'https://www.google.com/maps/place/AFPA/@50.6931817,3.1564099,17z/data=!3m1!4b1!4m5!3m4!1s0x47c328e2f9dd32f5:0x3b33b05842792807!8m2!3d50.6931461!4d3.1586935', 'M', 'Froulichet', 'Antonin', 'balayeur', 'Je gère également le standard téléphonique', 'froulichet.antonin@afpa.fr', '0754930158', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id_city` int(11) NOT NULL,
  `label_city` varchar(100) NOT NULL,
  `name_city` varchar(100) DEFAULT NULL,
  `zip_code_city` varchar(10) NOT NULL,
  `alpha2_country` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id_city`, `label_city`, `name_city`, `zip_code_city`, `alpha2_country`) VALUES
(1, 'Juvignac', 'juvignac', '34990', 'fr'),
(2, 'Montpellier', 'montpellier', '34000', 'fr'),
(3, 'Lavérune', 'laverune', '34880', 'fr'),
(4, 'Saint-Jean-de-Védas', 'saint_jean_de_vedas', '34430', 'fr'),
(5, 'Béziers', 'beziers', '34500', 'fr'),
(6, 'Istres', 'istres', '13800', 'fr'),
(7, 'Le Mans', 'le_mans', '72000', 'fr'),
(8, 'Roubaix', 'roubaix', '59100', 'fr'),
(9, 'Sète', 'sete', '34200', 'fr'),
(10, 'Agde', 'agde', '34300', 'fr');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `alpha2_country` char(2) NOT NULL,
  `label_country` varchar(60) NOT NULL,
  `name_country` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`alpha2_country`, `label_country`, `name_country`) VALUES
('be', 'Belgique', 'belgique'),
('ch', 'Suisse', 'suisse'),
('de', 'Allemagne', 'allemagne'),
('fr', 'France', 'france'),
('it', 'Italie', 'italie');

-- --------------------------------------------------------

--
-- Table structure for table `function`
--

CREATE TABLE `function` (
  `id_function` int(11) NOT NULL,
  `label_function` varchar(50) NOT NULL,
  `name_function` varchar(50) NOT NULL,
  `is_active_function` tinyint(1) NOT NULL COMMENT 'Default: true'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `function`
--

INSERT INTO `function` (`id_function`, `label_function`, `name_function`, `is_active_function`) VALUES
(1, 'Stagiaire', 'STAGIAIRE', 1),
(2, ' 	Formateur', 'FORMATEUR', 1),
(3, 'Employé Afpa', 'EMPLOYE_AFPA', 1);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `id_user__message_recipient` int(11) NOT NULL,
  `id_user__message_writer` int(11) NOT NULL,
  `content_message` text NOT NULL,
  `datetime_sending_message` datetime NOT NULL,
  `datetime_reading_message` datetime DEFAULT NULL,
  `status_report_message` tinyint(1) NOT NULL DEFAULT '0',
  `datetime_report_message` datetime DEFAULT NULL,
  `subject_report_message` varchar(50) DEFAULT NULL,
  `reason_report_message` varchar(250) DEFAULT NULL,
  `is_active_message` tinyint(1) NOT NULL COMMENT 'Default: true'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id_message`, `id_user__message_recipient`, `id_user__message_writer`, `content_message`, `datetime_sending_message`, `datetime_reading_message`, `status_report_message`, `datetime_report_message`, `subject_report_message`, `reason_report_message`, `is_active_message`) VALUES
(36, 6, 3, 'Salut! tu peux me récupérer à l\'Afpa ?', '2021-07-22 07:18:58', '2021-07-22 07:18:58', 0, NULL, NULL, NULL, 1),
(37, 3, 6, 'Oui pas de problèmes ! Mais c\'est Hard Métal tout le trajet !', '2021-07-22 07:20:02', '2021-07-22 07:20:02', 0, NULL, NULL, NULL, 1),
(38, 6, 3, 'ok ça roule !', '2021-07-22 09:21:57', NULL, 0, NULL, NULL, NULL, 1),
(39, 1, 3, 'Salut Thonayn ! Tu vas à l\'Afpa ?', '2021-07-22 07:22:14', '2021-07-22 07:22:14', 0, NULL, NULL, NULL, 1),
(40, 3, 1, 'À ton avis ?', '2021-07-22 07:23:07', '2021-07-22 07:23:07', 0, NULL, NULL, NULL, 1),
(41, 1, 3, 'Tu pourrais m&#039__POINTVIRGULE__emmener demain matin ?', '2021-07-22 09:24:08', NULL, 0, NULL, NULL, NULL, 1),
(42, 3, 5, 'Hey mon ami ! On se retrouve à l\'Afpa où tu me récupère pour le concert ?', '2021-07-22 07:24:15', '2021-07-22 07:24:15', 0, NULL, NULL, NULL, 1),
(43, 5, 3, 'Ouais j\'ai juste mon saxophone à récupérer !', '2021-07-22 07:25:25', '2021-07-22 07:25:25', 0, NULL, NULL, NULL, 1),
(44, 3, 1, 'Pas de problème gros !', '2021-07-22 07:33:08', '2021-07-22 07:33:08', 1, '2021-07-22 11:11:26', 'iggioh', 'àçyàçuy', 1),
(45, 1, 3, 'kuytflufgluy', '2021-07-22 11:03:51', '2021-07-22 11:09:11', 0, NULL, NULL, NULL, 1),
(46, 1, 3, 'nbv', '2021-07-22 11:05:59', '2021-07-22 11:09:28', 0, NULL, NULL, NULL, 1),
(47, 1, 3, 'oiohio', '2021-07-22 11:09:53', NULL, 0, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `opinion`
--

CREATE TABLE `opinion` (
  `id_opinion` int(11) NOT NULL,
  `id_score` int(11) NOT NULL,
  `id_user__opinion_recipient` int(11) NOT NULL,
  `id_user__opinion_writer` int(11) NOT NULL,
  `datetime_opinion` datetime NOT NULL,
  `content_opinion` text NOT NULL,
  `status_report_opinion` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Default: 0 (pas de signalement effectué)',
  `datetime_report_opinion` datetime DEFAULT NULL,
  `subject_report_opinion` varchar(50) DEFAULT NULL COMMENT 'Default: NULL',
  `reason_report_opinion` varchar(250) DEFAULT NULL COMMENT 'Default: NULL',
  `is_active_opinion` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Default: true'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `opinion`
--

INSERT INTO `opinion` (`id_opinion`, `id_score`, `id_user__opinion_recipient`, `id_user__opinion_writer`, `datetime_opinion`, `content_opinion`, `status_report_opinion`, `datetime_report_opinion`, `subject_report_opinion`, `reason_report_opinion`, `is_active_opinion`) VALUES
(1, 5, 1, 2, '2021-05-03 14:07:08', 'Très heureux de ce voyage avec Thamieu', 0, NULL, NULL, NULL, 1),
(2, 4, 5, 4, '2021-05-13 12:24:18', 'Xamime est un personnage très spécial, et très attirant', 2, '2021-05-14 15:09:01', 'harcèlement', 'je ne suis pas attirant', 1),
(3, 1, 1, 3, '2021-05-18 17:02:50', 'Roule uniquement sur les roues arrières, très dangereux', 0, NULL, NULL, NULL, 1),
(4, 2, 2, 1, '2021-05-18 09:08:43', 'Beaucoup trop musclé', 2, '2021-05-19 14:12:53', 'discrimination', 'Message discriminant', 0);

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `id_page` int(11) NOT NULL,
  `id_center` int(11) NOT NULL,
  `content_page` text NOT NULL,
  `label_page` varchar(50) NOT NULL,
  `name_page` varchar(50) NOT NULL,
  `is_in_footer_page` tinyint(1) NOT NULL COMMENT 'Default: true',
  `datetime_creation_page` datetime NOT NULL,
  `author_page` varchar(80) NOT NULL,
  `is_active_page` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`id_page`, `id_center`, `content_page`, `label_page`, `name_page`, `is_in_footer_page`, `datetime_creation_page`, `author_page`, `is_active_page`) VALUES
(1, 1, 'J\'suis en fumette dans la location\r\nLà j\'accélère, elle a des sensations\r\nJ\'fais des délits, la beuh dans l\'caleçon\r\nEt j\'fais l\'signe JuL en célébration', 'Charte du bon conducteur', 'charte_du_bon_conducteur', 1, '2021-05-13 11:44:53', 'Jean FREDENETTI', 1),
(2, 1, 'Oh, j\'entends les pim-pom, pim-pom, pim-pom\r\nDescente, ça prend des 20 ans, 20 ans, 20 ans\r\nPour rien, ça sort le pe-pom, pe-pom, pe-pom\r\nOh, j\'vais lui mettre un plan, elle a des implants (ok)\r\nC\'est la Seleção\r\nC\'est la Seleção\r\nC\'est la Seleção\r\nTu reviens comme si de rien n\'était mais où t\'étais?\r\n(Mais où t\'étais?)\r\nEt dire qu\'avant d\'percer, j\'ai pensé à tout laisser\r\n(À tout laisser)\r\nJe traînais, la mama, pour moi elle s\'inquiétait\r\n(Elle s\'inquiétait)\r\nMaintenant, j\'fais d\'la \'sique\r\nJ\'fais danser les chicas tout l\'été (tout l\'été)\r\nJe suis pas un héros\r\nJ\'peux pas tout remettre à zéro (ouais)\r\nDéjà khapta avant l\'apéro\r\nAvec les sanchos, les frérots (ok)\r\nMoi, j\'ai des trucs à faire\r\nÇa m\'emboucane à boire des verres (ouh)\r\nÀ l\'ancienne, y avait R, gros\r\nJ\'faisais mes p\'tites affaires (ah, ah, ah)', 'Mentions Légales', 'mentions_legales', 0, '2021-05-30 11:49:32', 'Vincent TEAM', 0);

-- --------------------------------------------------------

--
-- Table structure for table `profile_report`
--

CREATE TABLE `profile_report` (
  `id_profile_report` int(11) NOT NULL,
  `id_user__recipient` int(11) NOT NULL,
  `id_user__writer` int(11) NOT NULL,
  `status_profile_report` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Default: 1 (signalement pas encore traité)',
  `datetime_profile_report` datetime NOT NULL,
  `subject_profile_report` varchar(50) NOT NULL,
  `reason_profile_report` varchar(250) DEFAULT NULL COMMENT 'Default: NULL'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_report`
--

INSERT INTO `profile_report` (`id_profile_report`, `id_user__recipient`, `id_user__writer`, `status_profile_report`, `datetime_profile_report`, `subject_profile_report`, `reason_profile_report`) VALUES
(1, 2, 6, 1, '2021-06-12 08:15:45', 'insultes', 'La personne tient des propos injurieux à mon égard.'),
(2, 1, 5, 2, '2021-05-28 09:25:04', 'mensonge', 'C\'est faux, Thamieu est TRÈS TRÈS méchant !'),
(3, 3, 7, 3, '2021-04-28 00:00:00', 'J\'ai peur de lui', 'Morain me fait peur sur la photo. D\'autant plus qu\'il indique être psychopathe. Je suis effrayée à l\'idée de partager un trajet avec Morain.');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id_question` int(11) NOT NULL,
  `id_center` int(11) DEFAULT NULL,
  `index_question` tinyint(4) NOT NULL,
  `content_question` varchar(200) NOT NULL,
  `content_response` text NOT NULL,
  `datetime_question` datetime NOT NULL,
  `is_active_question` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id_question`, `id_center`, `index_question`, `content_question`, `content_response`, `datetime_question`, `is_active_question`) VALUES
(1, 2, 1, 'Bonjour, quelle est la durée du trajet svp ?', 'Tout dépend d\'où vous venez', '2021-05-12 12:19:26', 0),
(2, 1, 2, 'Quelle est l\'adresse du centre ?', '12 rue Jean Mermoz, St Jean de Védas', '2021-05-17 12:30:27', 0),
(3, 3, 3, 'Quel est le prix d\'un trajet ?', 'C\'est au choix des participants.', '2021-05-02 12:31:29', 0),
(4, 4, 1, 'On peut covoiturer en moto ?', 'Oui : des filtres de recherche sont à votre disposition sur la page \"Rechercher un trajet\". Le centre dispose de quelques places de stationnement pour les 2 roues.', '2021-05-08 12:32:07', 0),
(5, 1, 1, '&lt__POINTVIRGULE__em&gt__POINTVIRGULE__for (var i=0__POINTVIRGULE__i&lt__POINTVIRGULE__5__POINTVIRGULE__i++){alert(&quot__POINTVIRGULE__tes hack mon pote&quot__POINTVIRGULE__)__POINTVIRGULE__}', '', '2021-06-28 11:22:30', 0);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `label_role` varchar(50) NOT NULL,
  `name_role` varchar(50) NOT NULL,
  `is_active_role` tinyint(1) NOT NULL COMMENT 'Default: true'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `label_role`, `name_role`, `is_active_role`) VALUES
(1, 'Utilisateur', 'ROLE_UTILISATEUR', 1),
(2, 'Admin', 'ROLE_ADMIN', 1),
(3, 'Super Admin', 'ROLE_SUPER_ADMIN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `id_score` int(11) NOT NULL,
  `value_score` tinyint(4) NOT NULL,
  `label_score` varchar(50) NOT NULL,
  `name_score` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`id_score`, `value_score`, `label_score`, `name_score`) VALUES
(1, 1, 'Débutant', 'debutant'),
(2, 2, 'Utilisateur confirmé', 'utilisateur_confirme'),
(3, 3, 'Expert en conduite', 'expert_en_conduite'),
(4, 4, 'Pilote de ligne', 'pilote_de_ligne'),
(5, 5, 'Alain prost', 'alain_prost');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `id_center` int(11) NOT NULL,
  `id_function` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `name_user` varchar(80) NOT NULL,
  `firstname_user` varchar(80) NOT NULL,
  `gender_user` char(1) NOT NULL,
  `email_user` varchar(50) NOT NULL,
  `tel_user` varchar(15) NOT NULL,
  `temp_hash_user` varchar(255) DEFAULT NULL,
  `hash_user` varchar(255) DEFAULT NULL,
  `registration_number_user` varchar(11) NOT NULL,
  `registration_datetime_user` datetime DEFAULT NULL,
  `birthday_date_user` date DEFAULT NULL,
  `description_user` text,
  `filename_photo_user` varchar(70) DEFAULT NULL,
  `average_score_user` float DEFAULT NULL COMMENT 'à recalculer après chaque nouvel avis',
  `has_driving_license_user` tinyint(1) DEFAULT NULL COMMENT 'Default: false',
  `is_active_user` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `id_center`, `id_function`, `id_role`, `name_user`, `firstname_user`, `gender_user`, `email_user`, `tel_user`, `temp_hash_user`, `hash_user`, `registration_number_user`, `registration_datetime_user`, `birthday_date_user`, `description_user`, `filename_photo_user`, `average_score_user`, `has_driving_license_user`, `is_active_user`) VALUES
(1, 1, 1, 1, 'ZCHARWS', 'Thonayn', 'M', 'Thonayn.ZCHARWS@gmail.com', '0656896532', NULL, 'ez6gegpl8F!89egz+z4f96eg34', '19247526', '2021-01-15 10:12:58', '1989-11-05', 'Je suis très gentil', 'Anthony.jpg', 4, 1, 1),
(2, 1, 2, 3, 'GAGA', 'Ryamim', 'M', 'Ryamim@free.fr', '0711223344', NULL, 'zf849eg6++49JYT4+98SEF§$59e', '20019241', '2021-02-15 00:00:00', '1970-04-01', 'Bonjour,\r\n\r\nJe suis Jijou, formateur en développement web et web mobile ainsi qu\'en concepteur développeur d\'applications.\r\n\r\nJ\'adore le beau code, la moto, les belles voitures.\r\n\r\nJe n\'accepte pas les fumeurs car le tabac m\'irrite.\r\n\r\nA bientôt peut-être :)', 'Myriam.jpg', 5, 1, 1),
(3, 1, 2, 2, 'Sisquac', 'Morain', 'W', 'mel_du_34@yahoo.fr', '0688776655', NULL, 'fe4426!gre9DZ6!;89ZEF4egz69', '10019438', '2021-02-24 00:00:00', '1987-08-30', 'Bonjour,\r\n\r\nJe peux prendre jusque 6 personnes car ma voiture est immense.\r\n\r\nJe ne roule qu\'avec de la musique classique à fond la caisse car j\'adore ça.\r\n\r\nUn diffuseur au parfum de Jasmin diffuse tous ses arômes.\r\n\r\nAu plaisir', 'romain.jpg', 4, 1, 0),
(4, 2, 1, 1, 'FISH', 'Doris', 'W', 'doris@bubble.com', '0612345678', '61e:zf64GE59Q1FZE+FZ', '5EF1kfe§EFezf:efeg^$$dg', '2004129', '2021-03-12 00:00:00', '2000-04-20', 'Salut,\r\n\r\nJe suis un vrai poisson rouge, j\'oublie tout.\r\n\r\nD\'ailleurs je viens d\'oublier mon mot de passe.. je suis en train de le renouveler.\r\n\r\nJe suis célibataire et j\'ai une préférence pour les hommes barbus.\r\n\r\nA bientôt j\'espère ;)', 'doris.png', 2, 1, 1),
(5, 2, 1, 1, 'PARIERNI', 'Olbap', 'M', 'olbap.P@gmail.com', '', NULL, '61f6ez1f46z4+KFEZ62fze!e', '19847526', '2021-03-29 14:16:26', '1954-01-12', 'j\'adore les chevaux bien montés', 'pablo.jpg', 4, 1, 1),
(6, 1, 1, 1, 'DENGRE', 'Mhotas', 'M', 'mhotas.dengre@gmail.com', '0614214214', NULL, '1zd4ezhe2FfzabGEZHc', '19841426', NULL, NULL, 'j\'ai eu un cancer', 'Thomas.jpg', 5, 1, 1),
(7, 1, 1, 1, 'QUISAC', 'Morain', 'M', 'morain.siquac@gmail.com', '0696962546', '', 'lDAOiz6nk8inp@rkz3', '190107526', '2021-05-18 06:20:48', '1987-01-11', 'Homme tronc. Prenez garde je suis un dangereux psychopathe en liberté hahahaha !!', 'siquacmorain.jpg', 1, 0, 0),
(8, 1, 2, 1, 'dfhlkjdhf', 'fssfsf', 'w', 'dfdfddfdf', 'sdsfsdfsd', 'dsfdsfdfsdfs', 'dfsdsfdfsdfs', '12121212', '2021-06-07 00:00:00', '2021-06-01', 'dsfdsfsddsfdfs', 'dfsdfsdfsdfs', 2, 1, 2),
(14, 1, 2, 2, 'admin', 'admin', '1', 'pro_admin@mail.fr', '0102030405', NULL, '$argon2i$v=19$m=65536,t=4,p=1$RmJoMTdJQVFSU3h6akh2WA$dKEKeo8fd+xwR3JTaf5QWwe8GubY4eq6og+rpKxpqyY', '123456789', '2021-07-10 00:00:00', NULL, NULL, NULL, NULL, NULL, 1),
(16, 1, 2, 2, 'Santiago', 'Mathieu', '1', 'mathieusantiago21@gmail.com', '0102030405', NULL, '$argon2i$v=19$m=65536,t=4,p=1$V0s1MFYxdnV2cjRjRUZiQg$sxg8hgBrleUxsF/+JKscT6ISASozs/7wx9O+RTKXJDU', '987654321', '2021-07-13 00:00:00', NULL, NULL, NULL, NULL, NULL, 1),
(24, 1, 2, 2, 'benoit', 'benoit', '1', 'pro_benoit@mail.fr', '0102030405', NULL, '$argon2i$v=19$m=65536,t=4,p=1$N0tSaGFYRVAucjhTWjloQg$nCElVmPYXOzg3wVMb59jwZ0VpOXLqlJzjqdLp8S+l8M', '916295569', '2021-07-13 00:00:00', NULL, NULL, NULL, NULL, NULL, 0),
(25, 1, 2, 2, 'damien', 'damien', '1', 'pro_damien@mail.fr', '0102030405', NULL, '$argon2i$v=19$m=65536,t=4,p=1$RUxucjVRN0ZKMlpWSGY4cQ$brqGc8CO9fLKZ9yZXCej1xdI/0wlGzTh3Bv6V4LvTrs', '736274858', '2021-07-13 00:00:00', NULL, NULL, NULL, NULL, NULL, 1),
(26, 1, 2, 2, 'guillian', 'guillian', '1', 'pro_guillian@mail.fr', '0102030405', NULL, '$argon2i$v=19$m=65536,t=4,p=1$WVJ2OGpWNE5kb3JvVExTQQ$GJywkR7VYGh2jLT5ZoDlLrmrSb24/16Db/q37RFKRHo', '798420348', '2021-07-14 00:00:00', NULL, NULL, NULL, NULL, NULL, 0),
(27, 1, 3, 2, 'younes', 'younes', '1', 'pro_younes@mail.fr', '0102030405', NULL, '$argon2i$v=19$m=65536,t=4,p=1$dHIyTUM5Mk5uWUpxdE1aaQ$sWimvv6kvxelLh6GLLe9LKwZVvadXaiepQ11BfgzA9M', '101919837', '2021-07-14 00:00:00', NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vehicule`
--

CREATE TABLE `vehicule` (
  `id_vehicule` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `brand_vehicule` varchar(50) NOT NULL,
  `model_vehicule` varchar(50) NOT NULL,
  `color_vehicule` varchar(50) NOT NULL,
  `max_available_seats_vehicule` tinyint(4) NOT NULL,
  `filename_photo_vehicule` varchar(70) DEFAULT NULL,
  `is_main_vehicule` tinyint(1) NOT NULL,
  `is_active_vehicule` tinyint(1) NOT NULL COMMENT 'Default: true'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicule`
--

INSERT INTO `vehicule` (`id_vehicule`, `id_user`, `brand_vehicule`, `model_vehicule`, `color_vehicule`, `max_available_seats_vehicule`, `filename_photo_vehicule`, `is_main_vehicule`, `is_active_vehicule`) VALUES
(1, 1, 'Peugeot', '406', 'Rose', 3, 'peugeot_406.png', 0, 1),
(2, 2, 'Renault', 'Clio', 'Rouge', 3, 'clio.png', 1, 1),
(3, 3, 'Opel', 'Astra', 'Vert', 4, 'astra.png', 1, 1),
(4, 4, 'Seat', 'Leon', 'Magenta', 4, 'leon.pgn', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `weekday`
--

CREATE TABLE `weekday` (
  `id_weekday` int(11) NOT NULL,
  `id_ad` int(11) NOT NULL,
  `id_vehicule` int(11) NOT NULL,
  `label_weekday` varchar(50) NOT NULL,
  `name_weekday` varchar(50) NOT NULL,
  `num_weekday` tinyint(1) NOT NULL,
  `time_go_weekday` time DEFAULT NULL,
  `time_return_weekday` time DEFAULT NULL,
  `max_number_seats_available` tinyint(4) NOT NULL,
  `is_active_weekday` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `weekday`
--

INSERT INTO `weekday` (`id_weekday`, `id_ad`, `id_vehicule`, `label_weekday`, `name_weekday`, `num_weekday`, `time_go_weekday`, `time_return_weekday`, `max_number_seats_available`, `is_active_weekday`) VALUES
(1, 2, 3, 'Lundi', 'lundi', 2, NULL, '17:05:00', 4, 1),
(2, 2, 3, 'Mercredi', 'mercredi', 4, NULL, '17:20:00', 4, 1),
(3, 2, 3, 'Vendredi', 'vendredi', 6, NULL, '12:10:00', 4, 1),
(4, 2, 1, 'Jeudi', 'jeudi', 5, '06:30:00', NULL, 2, 1),
(5, 2, 3, 'Mardi', 'mardi', 3, '06:30:00', '12:10:00', 3, 0),
(6, 1, 4, 'Mardi', 'mardi', 3, '07:25:00', '17:00:00', 4, 1),
(7, 1, 4, 'Jeudi', 'jeudi', 5, '00:00:00', '17:20:00', 2, 1),
(8, 4, 2, 'Mercredi', 'mercredi', 4, '07:40:00', '12:25:27', 3, 1),
(9, 3, 2, 'Mardi', 'mardi', 3, '09:24:13', '09:28:12', 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ad`
--
ALTER TABLE `ad`
  ADD PRIMARY KEY (`id_ad`),
  ADD KEY `ad_user0_FK` (`id_user__writer`),
  ADD KEY `ad_address1_FK` (`id_address__start`),
  ADD KEY `ad_address2_FK` (`id_address__end`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id_address`),
  ADD KEY `address_user0_FK` (`id_user`),
  ADD KEY `address_city1_FK` (`id_city`);

--
-- Indexes for table `ad__city`
--
ALTER TABLE `ad__city`
  ADD PRIMARY KEY (`id_ad`,`id_city`),
  ADD KEY `ad__city_city1_FK` (`id_city`);

--
-- Indexes for table `ad__passenger`
--
ALTER TABLE `ad__passenger`
  ADD PRIMARY KEY (`id_ad`,`id_user__passenger`),
  ADD KEY `ad__passenger_user1_FK` (`id_user__passenger`);

--
-- Indexes for table `center`
--
ALTER TABLE `center`
  ADD PRIMARY KEY (`id_center`),
  ADD KEY `center_address0_FK` (`id_address`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id_city`),
  ADD KEY `city_country0_FK` (`alpha2_country`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`alpha2_country`);

--
-- Indexes for table `function`
--
ALTER TABLE `function`
  ADD PRIMARY KEY (`id_function`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `message_user0_FK` (`id_user__message_recipient`),
  ADD KEY `message_user1_FK` (`id_user__message_writer`);

--
-- Indexes for table `opinion`
--
ALTER TABLE `opinion`
  ADD PRIMARY KEY (`id_opinion`),
  ADD KEY `opinion_score1_FK` (`id_score`),
  ADD KEY `opinion_user0_FK` (`id_user__opinion_recipient`),
  ADD KEY `opinion_user2_FK` (`id_user__opinion_writer`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id_page`),
  ADD KEY `page_center0_FK` (`id_center`);

--
-- Indexes for table `profile_report`
--
ALTER TABLE `profile_report`
  ADD PRIMARY KEY (`id_profile_report`),
  ADD KEY `profile_report_user0_FK` (`id_user__writer`),
  ADD KEY `profile_report_user1_FK` (`id_user__recipient`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id_question`),
  ADD KEY `question_center0_FK` (`id_center`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id_score`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `user_function0_FK` (`id_function`),
  ADD KEY `user_role1_FK` (`id_role`),
  ADD KEY `user_center2_FK` (`id_center`);

--
-- Indexes for table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`id_vehicule`),
  ADD KEY `vehicule_user0_FK` (`id_user`);

--
-- Indexes for table `weekday`
--
ALTER TABLE `weekday`
  ADD PRIMARY KEY (`id_weekday`),
  ADD KEY `weekday_ad0_FK` (`id_ad`),
  ADD KEY `weekday_vehicule1_FK` (`id_vehicule`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ad`
--
ALTER TABLE `ad`
  MODIFY `id_ad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id_address` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `center`
--
ALTER TABLE `center`
  MODIFY `id_center` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id_city` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `function`
--
ALTER TABLE `function`
  MODIFY `id_function` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `opinion`
--
ALTER TABLE `opinion`
  MODIFY `id_opinion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `id_page` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `profile_report`
--
ALTER TABLE `profile_report`
  MODIFY `id_profile_report` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id_score` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `vehicule`
--
ALTER TABLE `vehicule`
  MODIFY `id_vehicule` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `weekday`
--
ALTER TABLE `weekday`
  MODIFY `id_weekday` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ad`
--
ALTER TABLE `ad`
  ADD CONSTRAINT `ad_address1_FK` FOREIGN KEY (`id_address__start`) REFERENCES `address` (`id_address`),
  ADD CONSTRAINT `ad_address2_FK` FOREIGN KEY (`id_address__end`) REFERENCES `address` (`id_address`),
  ADD CONSTRAINT `ad_user0_FK` FOREIGN KEY (`id_user__writer`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_city1_FK` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`),
  ADD CONSTRAINT `address_user0_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `ad__city`
--
ALTER TABLE `ad__city`
  ADD CONSTRAINT `ad__city_ad0_FK` FOREIGN KEY (`id_ad`) REFERENCES `ad` (`id_ad`),
  ADD CONSTRAINT `ad__city_city1_FK` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`);

--
-- Constraints for table `ad__passenger`
--
ALTER TABLE `ad__passenger`
  ADD CONSTRAINT `ad__passenger_ad0_FK` FOREIGN KEY (`id_ad`) REFERENCES `ad` (`id_ad`),
  ADD CONSTRAINT `ad__passenger_user1_FK` FOREIGN KEY (`id_user__passenger`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `center`
--
ALTER TABLE `center`
  ADD CONSTRAINT `center_address0_FK` FOREIGN KEY (`id_address`) REFERENCES `address` (`id_address`);

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_country0_FK` FOREIGN KEY (`alpha2_country`) REFERENCES `country` (`alpha2_country`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_user0_FK` FOREIGN KEY (`id_user__message_recipient`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `message_user1_FK` FOREIGN KEY (`id_user__message_writer`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `opinion_score1_FK` FOREIGN KEY (`id_score`) REFERENCES `score` (`id_score`),
  ADD CONSTRAINT `opinion_user0_FK` FOREIGN KEY (`id_user__opinion_recipient`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `opinion_user2_FK` FOREIGN KEY (`id_user__opinion_writer`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `page_center0_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Constraints for table `profile_report`
--
ALTER TABLE `profile_report`
  ADD CONSTRAINT `profile_report_user0_FK` FOREIGN KEY (`id_user__writer`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `profile_report_user1_FK` FOREIGN KEY (`id_user__recipient`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_center0_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_center2_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`),
  ADD CONSTRAINT `user_function0_FK` FOREIGN KEY (`id_function`) REFERENCES `function` (`id_function`),
  ADD CONSTRAINT `user_role1_FK` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);

--
-- Constraints for table `vehicule`
--
ALTER TABLE `vehicule`
  ADD CONSTRAINT `vehicule_user0_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `weekday`
--
ALTER TABLE `weekday`
  ADD CONSTRAINT `weekday_ad0_FK` FOREIGN KEY (`id_ad`) REFERENCES `ad` (`id_ad`),
  ADD CONSTRAINT `weekday_vehicule1_FK` FOREIGN KEY (`id_vehicule`) REFERENCES `vehicule` (`id_vehicule`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
