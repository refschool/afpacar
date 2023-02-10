-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 30 mai 2021 à 19:31
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `afpacar`
--

-- --------------------------------------------------------

--
-- Structure de la table `ad`
--

DROP TABLE IF EXISTS `ad`;
CREATE TABLE IF NOT EXISTS `ad` (
  `id_ad` int(11) NOT NULL AUTO_INCREMENT,
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
  `is_active_ad` tinyint(1) NOT NULL COMMENT 'Default: true',
  PRIMARY KEY (`id_ad`),
  KEY `ad_user0_FK` (`id_user__writer`),
  KEY `ad_address1_FK` (`id_address__start`),
  KEY `ad_address2_FK` (`id_address__end`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ad`
--

INSERT INTO `ad` (`id_ad`, `id_user__writer`, `id_address__start`, `id_address__end`, `is_driver_ad`, `content_ad`, `datetime_creation_ad`, `date_start_ad`, `date_end_ad`, `are_smokers_allowed_ad`, `is_luggage_allowed_ad`, `are_disabled_people_allowed_ad`, `status_report_ad`, `subject_report_ad`, `reason_report_ad`, `comment_start_address_ad`, `comment_end_address_ad`, `is_active_ad`) VALUES
(1, 5, 8, NULL, 1, 'J\'adore la hardbass, j\'espère que vous aussi', '2021-05-23 10:12:23', '2021-05-23', '2021-06-18', 1, 0, 1, 2, 'Abus', NULL, 'Rdv sur le parking de la boulangerie', NULL, 1),
(2, 2, NULL, 6, 1, 'Bonjour, je vous propose de vous déposer chez vous sur mon trajet retour, le lundi, mercredi et vendredi.\r\n\r\nJe peux aussi vous prendre le jeudi matin mais uniquement à l\'aller.', '2021-05-27 14:53:10', '2021-05-30', '2021-09-24', 0, 1, 1, 0, NULL, NULL, NULL, 'Je suis garé devant le bâtiment B', 1),
(3, 7, 10, NULL, 0, 'Je cherche quelqu\'un qui connait la route par cœur et qui accepte mon bagage (colis suspect).', '2021-04-28 12:16:25', '2021-05-03', '2021-05-07', 0, 1, 0, 1, NULL, NULL, 'Pas de retard svp !', NULL, 1),
(4, 1, 9, NULL, 1, 'Je ne donne pas mon numéro de téléphone. Passion : impression 3D de vélos !', '2021-04-16 11:46:35', '2021-04-19', '2021-04-21', 1, 0, 0, 0, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `id_address` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_city` int(11) NOT NULL,
  `address_address` varchar(60) NOT NULL,
  `additional_address_address` varchar(60) DEFAULT NULL,
  `is_main_address` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_address`),
  KEY `address_user0_FK` (`id_user`),
  KEY `address_city1_FK` (`id_city`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id_address`, `id_user`, `id_city`, `address_address`, `additional_address_address`, `is_main_address`) VALUES
(1, NULL, 4, '12 rue Jean Mermoz', NULL, NULL),
(2, NULL, 5, '34 rue de Costesèque', NULL, NULL),
(3, NULL, 6, 'avenue Felix Gouin', NULL, NULL),
(4, NULL, 7, '366 avenue Georges Durand', NULL, NULL),
(5, NULL, 8, '20 rue du Luxembourg', NULL, NULL),
(6, 2, 5, '12 rue du PHP King', 'villa \"EnjoyTheCode\"', NULL),
(7, 5, 4, '15 rue de la Mayonnaise', 'rés. \"Les 3 sauces\", appt 12', 0),
(8, 5, 2, '10 rue de Chez Moi', NULL, 1),
(9, 1, 2, '5 rue Loin de Tout', NULL, NULL),
(10, 7, 10, '20 rue de la Fausse adresse', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `ad__city`
--

DROP TABLE IF EXISTS `ad__city`;
CREATE TABLE IF NOT EXISTS `ad__city` (
  `id_ad` int(11) NOT NULL,
  `id_city` int(11) NOT NULL,
  `comment_stage` text,
  `index_stage` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_ad`,`id_city`),
  KEY `ad__city_city1_FK` (`id_city`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Chaque ville correspond à une étape du trajet';

--
-- Déchargement des données de la table `ad__city`
--

INSERT INTO `ad__city` (`id_ad`, `id_city`, `comment_stage`, `index_stage`) VALUES
(2, 9, 'Je peux prendre quelqu\'un devant le McDo vers 7h30', 2),
(2, 10, 'Je peux prendre quelqu\'un sur le parking d\'Intermarché le jeudi vers 7h00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `ad__passenger`
--

DROP TABLE IF EXISTS `ad__passenger`;
CREATE TABLE IF NOT EXISTS `ad__passenger` (
  `id_ad` int(11) NOT NULL,
  `id_user__passenger` int(11) NOT NULL,
  `datetime_creation_contract__passenger` datetime NOT NULL,
  `datetime_acceptance_contract__passenger` datetime DEFAULT NULL,
  `price_contract__passenger` float NOT NULL DEFAULT '0',
  `service_contract__passenger` text,
  PRIMARY KEY (`id_ad`,`id_user__passenger`),
  KEY `ad__passenger_user1_FK` (`id_user__passenger`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ad__passenger`
--

INSERT INTO `ad__passenger` (`id_ad`, `id_user__passenger`, `datetime_creation_contract__passenger`, `datetime_acceptance_contract__passenger`, `price_contract__passenger`, `service_contract__passenger`) VALUES
(1, 1, '2021-05-25 09:18:36', NULL, 4, 'Promener mon chien (Rott weiler affamé)'),
(2, 7, '2021-04-12 15:18:25', '2021-04-12 16:27:04', 19, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `center`
--

DROP TABLE IF EXISTS `center`;
CREATE TABLE IF NOT EXISTS `center` (
  `id_center` int(11) NOT NULL AUTO_INCREMENT,
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
  `is_active_center` tinyint(1) NOT NULL COMMENT 'Default: true',
  PRIMARY KEY (`id_center`),
  KEY `center_address0_FK` (`id_address`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `center`
--

INSERT INTO `center` (`id_center`, `id_address`, `label_center`, `name_center`, `tel_center`, `email_center`, `hours_center`, `url_map_center`, `contact_gender_center`, `contact_name_center`, `contact_firstname_center`, `contact_role_center`, `contact_description_center`, `contact_email_center`, `contact_tel_center`, `contact_show_tel_to_public`, `is_active_center`) VALUES
(1, 1, 'Centre Afpa de Montpellier St Jean', 'afpa_montpellier_saint_jean', NULL, 'contact_34430@afpa.fr', 'lundi : 	08h00 - 12h30 / 13h30 - 16h00\r\nmardi : 	08h00 - 12h30 / 13h30 - 16h00\r\nmercredi : 	08h00 - 12h30 / 13h30 - 16h00\r\njeudi : 	08h00 - 12h30 / 13h30 - 16h00\r\nvendredi : 	08h00 - 12h30', 'https://fr.mappy.com/poi/5fd60f89aa455b2ae55753e5', 'M', 'DUBOIS', 'René', 'Agent administratif', 'Pour toute visite de centre, M. Dubois est la personne à contacter', 'rene.dubois@afpa.fr', '0638925621', 0, 1),
(2, 2, 'Centre Afpa de Béziers', 'afpa_beziers', NULL, 'contact_34500@afpa.fr', 'lundi : 	08h15 - 12h00 / 13h00 - 16h00\r\nmardi : 	08h15 - 12h00 / 13h00 - 16h00\r\nmercredi : 	08h15 - 12h00 / 13h00 - 16h00\r\njeudi : 	08h15 - 12h00 / 13h00 - 16h00\r\nvendredi : 	08h00 - 12h00', 'https://fr.mappy.com/poi/5d87ff9654c4c060f39df52a', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, 3, 'Centre Afpa d\'Istres', 'afpa_istres', NULL, 'contact_13800@afpa.fr', 'lundi : 	08h00 - 12h00 / 13h15 - 17h15\r\nmardi : 	08h00 - 12h00 / 13h15 - 17h15\r\nmercredi : 	08h00 - 12h00 / 13h15 - 17h15\r\njeudi : 	08h00 - 12h00 / 13h15 - 17h15\r\nvendredi : 	08h00 - 12h00', 'https://www.google.com/maps/search/afpa+istres/@43.4956411,4.9781794,15z/data=!3m1!4b1', 'M', 'Patulacci', 'Robert', 'professeur', 'Enseigne comment devenir un bon agent de la paix avant tout', 'robert.patulacci@afpa.fr', '0608090705', 0, 1),
(4, 4, 'Centre Afpa du Mans', 'afpa_le_mans', NULL, 'contact_72000@afpa.fr', 'lundi : 	08h30 - 12h00 / 13h30 - 17h30\r\nmardi : 	08h30 - 12h00 / 13h30 - 17h30\r\nmercredi : 	08h30 - 12h00 / 13h30 - 17h30\r\njeudi : 	08h30 - 12h00 / 13h30 - 17h30\r\nvendredi : 	08h30 - 12h00 / 13h30 - 15h30', 'https://www.google.com/maps/place/AFPA/@47.9682238,0.2164223,15z/data=!4m2!3m1!1s0x0:0x73bd1ea6b3c84781?sa=X&ved=2ahUKEwjf-pPiz-nwAhU55uAKHfaBABoQ_BIwG3oECE4QBQ', 'W', 'Dupont', 'Charline', 'directrice', NULL, 'charline.dupont@afpa.fr', '0680704132', 0, 1),
(5, 5, 'Centre Afpa de Roubaix', 'afpa_roubaix', NULL, 'contact_59100@afpa.fr', 'lundi : 	08h00 - 12h30 / 13h30 - 17h15\r\nmardi : 	08h00 - 12h30 / 13h30 - 17h15\r\nmercredi : 	08h00 - 12h30 / 13h30 - 17h15\r\njeudi : 	08h00 - 12h30 / 13h30 - 17h15\r\nvendredi : 	08h00 - 12h30', 'https://www.google.com/maps/place/AFPA/@50.6931817,3.1564099,17z/data=!3m1!4b1!4m5!3m4!1s0x47c328e2f9dd32f5:0x3b33b05842792807!8m2!3d50.6931461!4d3.1586935', 'M', 'Froulichet', 'Antonin', 'balayeur', 'Je gère également le standard téléphonique', 'froulichet.antonin@afpa.fr', '0754930158', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `id_city` int(11) NOT NULL AUTO_INCREMENT,
  `label_city` varchar(100) NOT NULL,
  `name_city` varchar(100) DEFAULT NULL,
  `zip_code_city` varchar(10) NOT NULL,
  `alpha2_country` char(2) NOT NULL,
  PRIMARY KEY (`id_city`),
  KEY `city_country0_FK` (`alpha2_country`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `city`
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
-- Structure de la table `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `alpha2_country` char(2) NOT NULL,
  `label_country` varchar(60) NOT NULL,
  `name_country` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`alpha2_country`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `country`
--

INSERT INTO `country` (`alpha2_country`, `label_country`, `name_country`) VALUES
('be', 'Belgique', 'belgique'),
('ch', 'Suisse', 'suisse'),
('de', 'Allemagne', 'allemagne'),
('fr', 'France', 'france'),
('it', 'Italie', 'italie');

-- --------------------------------------------------------

--
-- Structure de la table `function`
--

DROP TABLE IF EXISTS `function`;
CREATE TABLE IF NOT EXISTS `function` (
  `id_function` int(11) NOT NULL AUTO_INCREMENT,
  `label_function` varchar(50) NOT NULL,
  `name_function` varchar(50) NOT NULL,
  `is_active_function` tinyint(1) NOT NULL COMMENT 'Default: true',
  PRIMARY KEY (`id_function`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `function`
--

INSERT INTO `function` (`id_function`, `label_function`, `name_function`, `is_active_function`) VALUES
(1, 'Stagiaire', 'STAGIAIRE', 1),
(2, ' 	Formateur', 'FORMATEUR', 1),
(3, 'Employé Afpa', 'EMPLOYE_AFPA', 1);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id_message` int(11) NOT NULL AUTO_INCREMENT,
  `id_user__message_recipient` int(11) NOT NULL,
  `id_user__message_writer` int(11) NOT NULL,
  `content_message` text NOT NULL,
  `datetime_sending_message` datetime NOT NULL,
  `datetime_reading_message` datetime DEFAULT NULL,
  `status_report_message` tinyint(1) NOT NULL DEFAULT '0',
  `datetime_report_message` datetime DEFAULT NULL,
  `subject_report_message` varchar(50) DEFAULT NULL,
  `reason_report_message` varchar(250) DEFAULT NULL,
  `is_active_message` tinyint(1) NOT NULL COMMENT 'Default: true',
  PRIMARY KEY (`id_message`),
  KEY `message_user0_FK` (`id_user__message_recipient`),
  KEY `message_user1_FK` (`id_user__message_writer`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id_message`, `id_user__message_recipient`, `id_user__message_writer`, `content_message`, `datetime_sending_message`, `datetime_reading_message`, `status_report_message`, `datetime_report_message`, `subject_report_message`, `reason_report_message`, `is_active_message`) VALUES
(1, 1, 3, 'Wesh Thamieu bien ou quoi !?', '2021-05-26 10:23:59', '2021-05-26 10:24:03', 2, '2021-05-26 10:24:03', 'outrage', 'Je n\'aime pas son ton', 1),
(2, 1, 3, 'Hey Xamime !', '2021-05-26 10:23:59', '2021-05-26 10:24:03', 0, NULL, NULL, NULL, 1),
(3, 3, 1, 'Tu me dois 50 carambars en échange !', '2021-05-26 10:28:59', '2021-05-26 10:29:03', 1, '2021-05-26 10:34:03', 'mensonge', 'On avait convenu de 30 carambars pas 50 : je lui ai déjà donné !', 1),
(4, 2, 4, 'Seuls les chinois sont acceptés', '2021-05-28 10:23:59', '2021-05-26 10:24:03', 3, '2021-05-26 10:24:03', 'racsime', NULL, 1),
(5, 3, 5, 'Espèce de bachi bouzouk, marin d\'eau douce, ectoplasme, moule à gauffres !!', '2021-04-29 11:26:12', '2021-04-29 11:43:15', 3, '2021-04-29 11:44:02', 'Insultes', 'Xamime me traite sans raisons : je suis outrée par le comportement incongru de cet individu malsain et malfaisant !', 0),
(6, 5, 3, 'Je signale ton message, tu vas me le payer cher petit c** !', '2021-04-29 11:43:45', '2021-04-29 11:43:52', 0, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `opinion`
--

DROP TABLE IF EXISTS `opinion`;
CREATE TABLE IF NOT EXISTS `opinion` (
  `id_opinion` int(11) NOT NULL AUTO_INCREMENT,
  `id_score` int(11) NOT NULL,
  `id_user__opinion_recipient` int(11) NOT NULL,
  `id_user__opinion_writer` int(11) NOT NULL,
  `datetime_opinion` datetime NOT NULL,
  `content_opinion` text NOT NULL,
  `status_report_opinion` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Default: 0 (pas de signalement effectué)',
  `datetime_report_opinion` datetime DEFAULT NULL,
  `subject_report_opinion` varchar(50) DEFAULT NULL COMMENT 'Default: NULL',
  `reason_report_opinion` varchar(250) DEFAULT NULL COMMENT 'Default: NULL',
  `is_active_opinion` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Default: true',
  PRIMARY KEY (`id_opinion`),
  KEY `opinion_score1_FK` (`id_score`),
  KEY `opinion_user0_FK` (`id_user__opinion_recipient`),
  KEY `opinion_user2_FK` (`id_user__opinion_writer`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `opinion`
--

INSERT INTO `opinion` (`id_opinion`, `id_score`, `id_user__opinion_recipient`, `id_user__opinion_writer`, `datetime_opinion`, `content_opinion`, `status_report_opinion`, `datetime_report_opinion`, `subject_report_opinion`, `reason_report_opinion`, `is_active_opinion`) VALUES
(1, 5, 1, 2, '2021-05-03 14:07:08', 'Très heureux de ce voyage avec Thamieu', 0, NULL, NULL, NULL, 1),
(2, 4, 5, 4, '2021-05-13 12:24:18', 'Xamime est un personnage très spécial, et très attirant', 2, '2021-05-14 15:09:01', 'harcèlement', 'je ne suis pas attirant', 1),
(3, 1, 1, 3, '2021-05-18 17:02:50', 'Roule uniquement sur les roues arrières, très dangereux', 0, NULL, NULL, NULL, 1),
(4, 2, 2, 1, '2021-05-18 09:08:43', 'Beaucoup trop musclé', 2, '2021-05-19 14:12:53', 'discrimination', 'Message discriminant', 0);

-- --------------------------------------------------------

--
-- Structure de la table `page`
--

DROP TABLE IF EXISTS `page`;
CREATE TABLE IF NOT EXISTS `page` (
  `id_page` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) NOT NULL,
  `content_page` text NOT NULL,
  `label_page` varchar(50) NOT NULL,
  `name_page` varchar(50) NOT NULL,
  `is_in_footer_page` tinyint(1) NOT NULL COMMENT 'Default: true',
  `datetime_creation_page` datetime NOT NULL,
  `author_page` varchar(80) NOT NULL,
  `is_active_page` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_page`),
  KEY `page_center0_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `page`
--

INSERT INTO `page` (`id_page`, `id_center`, `content_page`, `label_page`, `name_page`, `is_in_footer_page`, `datetime_creation_page`, `author_page`, `is_active_page`) VALUES
(1, 1, 'J\'suis en fumette dans la location\r\nLà j\'accélère, elle a des sensations\r\nJ\'fais des délits, la beuh dans l\'caleçon\r\nEt j\'fais l\'signe JuL en célébration', 'Charte du bon conducteur', 'charte_du_bon_conducteur', 1, '2021-05-13 11:44:53', 'Jean FREDENETTI', 1),
(2, 1, 'Oh, j\'entends les pim-pom, pim-pom, pim-pom\r\nDescente, ça prend des 20 ans, 20 ans, 20 ans\r\nPour rien, ça sort le pe-pom, pe-pom, pe-pom\r\nOh, j\'vais lui mettre un plan, elle a des implants (ok)\r\nC\'est la Seleção\r\nC\'est la Seleção\r\nC\'est la Seleção\r\nTu reviens comme si de rien n\'était mais où t\'étais?\r\n(Mais où t\'étais?)\r\nEt dire qu\'avant d\'percer, j\'ai pensé à tout laisser\r\n(À tout laisser)\r\nJe traînais, la mama, pour moi elle s\'inquiétait\r\n(Elle s\'inquiétait)\r\nMaintenant, j\'fais d\'la \'sique\r\nJ\'fais danser les chicas tout l\'été (tout l\'été)\r\nJe suis pas un héros\r\nJ\'peux pas tout remettre à zéro (ouais)\r\nDéjà khapta avant l\'apéro\r\nAvec les sanchos, les frérots (ok)\r\nMoi, j\'ai des trucs à faire\r\nÇa m\'emboucane à boire des verres (ouh)\r\nÀ l\'ancienne, y avait R, gros\r\nJ\'faisais mes p\'tites affaires (ah, ah, ah)', 'Mentions Légales', 'mentions_legales', 0, '2021-05-30 11:49:32', 'Vincent TEAM', 0);

-- --------------------------------------------------------

--
-- Structure de la table `profile_report`
--

DROP TABLE IF EXISTS `profile_report`;
CREATE TABLE IF NOT EXISTS `profile_report` (
  `id_profile_report` int(11) NOT NULL AUTO_INCREMENT,
  `id_user__recipient` int(11) NOT NULL,
  `id_user__writer` int(11) NOT NULL,
  `status_profile_report` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Default: 1 (signalement pas encore traité)',
  `datetime_profile_report` datetime NOT NULL,
  `subject_profile_report` varchar(50) NOT NULL,
  `reason_profile_report` varchar(250) DEFAULT NULL COMMENT 'Default: NULL',
  PRIMARY KEY (`id_profile_report`),
  KEY `profile_report_user0_FK` (`id_user__writer`),
  KEY `profile_report_user1_FK` (`id_user__recipient`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `profile_report`
--

INSERT INTO `profile_report` (`id_profile_report`, `id_user__recipient`, `id_user__writer`, `status_profile_report`, `datetime_profile_report`, `subject_profile_report`, `reason_profile_report`) VALUES
(1, 2, 6, 1, '2021-06-12 08:15:45', 'insultes', 'La personne tient des propos injurieux à mon égard.'),
(2, 1, 5, 2, '2021-05-28 09:25:04', 'mensonge', 'C\'est faux, Thamieu est TRÈS TRÈS méchant !'),
(3, 3, 7, 3, '2021-04-28 00:00:00', 'J\'ai peur de lui', 'Morain me fait peur sur la photo. D\'autant plus qu\'il indique être psychopathe. Je suis effrayée à l\'idée de partager un trajet avec Morain.');

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id_question` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) DEFAULT NULL,
  `index_question` tinyint(4) NOT NULL,
  `content_question` varchar(200) NOT NULL,
  `content_response` text NOT NULL,
  `datetime_question` datetime NOT NULL,
  `is_active_question` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_question`),
  KEY `question_center0_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`id_question`, `id_center`, `index_question`, `content_question`, `content_response`, `datetime_question`, `is_active_question`) VALUES
(1, 2, 1, 'Bonjour, quelle est la durée du trajet svp ?', 'Tout dépend d\'où vous venez', '2021-05-12 12:19:26', 1),
(2, 1, 2, 'Quelle est l\'adresse du centre ?', '12 rue Jean Mermoz, St Jean de Védas', '2021-05-17 12:30:27', 1),
(3, 3, 3, 'Quel est le prix d\'un trajet ?', 'C\'est au choix des participants.', '2021-05-02 12:31:29', 1),
(4, 4, 1, 'On peut covoiturer en moto ?', 'Oui : des filtres de recherche sont à votre disposition sur la page \"Rechercher un trajet\". Le centre dispose de quelques places de stationnement pour les 2 roues.', '2021-05-08 12:32:07', 1);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `label_role` varchar(50) NOT NULL,
  `name_role` varchar(50) NOT NULL,
  `is_active_role` tinyint(1) NOT NULL COMMENT 'Default: true',
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id_role`, `label_role`, `name_role`, `is_active_role`) VALUES
(1, 'Utilisateur', 'ROLE_UTILISATEUR', 1),
(2, 'Admin', 'ROLE_ADMIN', 1),
(3, 'Super Admin', 'ROLE_SUPER_ADMIN', 1);

-- --------------------------------------------------------

--
-- Structure de la table `score`
--

DROP TABLE IF EXISTS `score`;
CREATE TABLE IF NOT EXISTS `score` (
  `id_score` int(11) NOT NULL AUTO_INCREMENT,
  `value_score` tinyint(4) NOT NULL,
  `label_score` varchar(50) NOT NULL,
  `name_score` varchar(50) NOT NULL,
  PRIMARY KEY (`id_score`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `score`
--

INSERT INTO `score` (`id_score`, `value_score`, `label_score`, `name_score`) VALUES
(1, 1, 'Débutant', 'debutant'),
(2, 2, 'Utilisateur confirmé', 'utilisateur_confirme'),
(3, 3, 'Expert en conduite', 'expert_en_conduite'),
(4, 4, 'Pilote de ligne', 'pilote_de_ligne'),
(5, 5, 'Alain prost', 'alain_prost');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
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
  `has_driving_license_user` tinyint(1) NOT NULL COMMENT 'Default: false',
  `is_active_user` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `user_function0_FK` (`id_function`),
  KEY `user_role1_FK` (`id_role`),
  KEY `user_center2_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `id_center`, `id_function`, `id_role`, `name_user`, `firstname_user`, `gender_user`, `email_user`, `tel_user`, `temp_hash_user`, `hash_user`, `registration_number_user`, `registration_datetime_user`, `birthday_date_user`, `description_user`, `filename_photo_user`, `average_score_user`, `has_driving_license_user`, `is_active_user`) VALUES
(1, 1, 1, 1, 'TIANSAGO', 'Thamieu', 'M', 'thamieu.tiansago@gmail.com', '0656896532', NULL, 'ez6gegpl8F!89egz+z4f96eg34', '19247526', '2021-01-15 10:12:58', '1989-11-05', 'Je suis très gentil', 'mathieu_lebg.jpg', 4, 1, 1),
(2, 1, 2, 3, 'PAGAN', 'Jean-Jacques', 'M', 'jijou_youpi@free.fr', '0711223344', NULL, 'zf849eg6++49JYT4+98SEF§$59e', '20019241', '2021-02-15 00:00:00', '1970-04-01', 'Bonjour,\r\n\r\nJe suis Jijou, formateur en développement web et web mobile ainsi qu\'en concepteur développeur d\'applications.\r\n\r\nJ\'adore le beau code, la moto, les belles voitures.\r\n\r\nJe n\'accepte pas les fumeurs car le tabac m\'irrite.\r\n\r\nA bientôt peut-être :)', 'jijou.jpg', 5, 1, 1),
(3, 1, 2, 2, 'PHILIPPON', 'Mélanie', 'W', 'mel_du_34@yahoo.fr', '0688776655', NULL, 'fe4426!gre9DZ6!;89ZEF4egz69', '10019438', '2021-02-24 00:00:00', '1987-08-30', 'Bonjour,\r\n\r\nJe peux prendre jusque 6 personnes car ma voiture est immense.\r\n\r\nJe ne roule qu\'avec de la musique classique à fond la caisse car j\'adore ça.\r\n\r\nUn diffuseur au parfum de Jasmin diffuse tous ses arômes.\r\n\r\nAu plaisir', NULL, 4, 1, 1),
(4, 2, 1, 1, 'FISH', 'Doris', 'W', 'doris@bubble.com', '0612345678', '61e:zf64GE59Q1FZE+FZ', '5EF1kfe§EFezf:efeg^$$dg', '2004129', '2021-03-12 00:00:00', '2000-04-20', 'Salut,\r\n\r\nJe suis un vrai poisson rouge, j\'oublie tout.\r\n\r\nD\'ailleurs je viens d\'oublier mon mot de passe.. je suis en train de le renouveler.\r\n\r\nJe suis célibataire et j\'ai une préférence pour les hommes barbus.\r\n\r\nA bientôt j\'espère ;)', 'doris.png', 2, 1, 1),
(5, 2, 1, 1, 'DIEUDE', 'Xamime', 'M', 'dieude.xamime@gmail.com', '', NULL, '61f6ez1f46z4+KFEZ62fze!e', '19847526', '2021-03-29 14:16:26', '1954-01-12', 'j\'adore les chevaux bien montés', 'dieudemax.jpg', 4, 1, 1),
(6, 1, 1, 1, 'DENGRE', 'Mhotas', 'M', 'mhotas.dengre@gmail.com', '0614214214', NULL, '1zd4ezhe2FfzabGEZHc', '19841426', NULL, NULL, 'j\'ai eu un cancer', 'mhotasdengre.jpg', 5, 1, 1),
(7, 1, 1, 1, 'QUISAC', 'Morain', 'M', 'morain.siquac@gmail.com', '0696962546', '', 'lDAOiz6nk8inp@rkz3', '190107526', '2021-05-18 06:20:48', '1987-01-11', 'Homme tronc. Prenez garde je suis un dangereux psychopathe en liberté hahahaha !!', 'siquacmorain.jpg', 1, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `vehicule`
--

DROP TABLE IF EXISTS `vehicule`;
CREATE TABLE IF NOT EXISTS `vehicule` (
  `id_vehicule` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `brand_vehicule` varchar(50) NOT NULL,
  `model_vehicule` varchar(50) NOT NULL,
  `color_vehicule` varchar(50) NOT NULL,
  `max_available_seats_vehicule` tinyint(4) NOT NULL,
  `filename_photo_vehicule` varchar(70) DEFAULT NULL,
  `is_main_vehicule` tinyint(1) NOT NULL,
  `is_active_vehicule` tinyint(1) NOT NULL COMMENT 'Default: true',
  PRIMARY KEY (`id_vehicule`),
  KEY `vehicule_user0_FK` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vehicule`
--

INSERT INTO `vehicule` (`id_vehicule`, `id_user`, `brand_vehicule`, `model_vehicule`, `color_vehicule`, `max_available_seats_vehicule`, `filename_photo_vehicule`, `is_main_vehicule`, `is_active_vehicule`) VALUES
(1, 1, 'Peugeot', '406', 'Rose', 3, 'peugeot_406.png', 0, 1),
(2, 2, 'Renault', 'Clio', 'Rouge', 3, 'clio.png', 1, 1),
(3, 3, 'Opel', 'Astra', 'Vert', 4, 'astra.png', 1, 1),
(4, 4, 'Seat', 'Leon', 'Magenta', 4, 'leon.pgn', 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `weekday`
--

DROP TABLE IF EXISTS `weekday`;
CREATE TABLE IF NOT EXISTS `weekday` (
  `id_weekday` int(11) NOT NULL AUTO_INCREMENT,
  `id_ad` int(11) NOT NULL,
  `id_vehicule` int(11) NOT NULL,
  `label_weekday` varchar(50) NOT NULL,
  `name_weekday` varchar(50) NOT NULL,
  `time_go_weekday` time DEFAULT NULL,
  `time_return_weekday` time DEFAULT NULL,
  `max_number_seats_available` tinyint(4) NOT NULL,
  `is_active_weekday` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_weekday`),
  KEY `weekday_ad0_FK` (`id_ad`),
  KEY `weekday_vehicule1_FK` (`id_vehicule`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `weekday`
--

INSERT INTO `weekday` (`id_weekday`, `id_ad`, `id_vehicule`, `label_weekday`, `name_weekday`, `time_go_weekday`, `time_return_weekday`, `max_number_seats_available`, `is_active_weekday`) VALUES
(1, 2, 3, 'Lundi', 'lundi', NULL, '17:05:00', 4, 1),
(2, 2, 3, 'Mercredi', 'mercredi', NULL, '17:20:00', 4, 1),
(3, 2, 3, 'Vendredi', 'vendredi', NULL, '12:10:00', 4, 1),
(4, 2, 1, 'Jeudi', 'jeudi', '06:30:00', NULL, 2, 1),
(5, 2, 3, 'Mardi', 'mardi', '06:30:00', NULL, 3, 0),
(6, 1, 4, 'Mardi', 'mardi', '07:25:00', '17:00:00', 4, 1),
(7, 1, 4, 'Jeudi', 'jeudi', '00:00:00', '17:20:00', 2, 1),
(8, 4, 2, 'Mercredi', 'mercredi', '07:40:00', NULL, 3, 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ad`
--
ALTER TABLE `ad`
  ADD CONSTRAINT `ad_address1_FK` FOREIGN KEY (`id_address__start`) REFERENCES `address` (`id_address`),
  ADD CONSTRAINT `ad_address2_FK` FOREIGN KEY (`id_address__end`) REFERENCES `address` (`id_address`),
  ADD CONSTRAINT `ad_user0_FK` FOREIGN KEY (`id_user__writer`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_city1_FK` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`),
  ADD CONSTRAINT `address_user0_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `ad__city`
--
ALTER TABLE `ad__city`
  ADD CONSTRAINT `ad__city_ad0_FK` FOREIGN KEY (`id_ad`) REFERENCES `ad` (`id_ad`),
  ADD CONSTRAINT `ad__city_city1_FK` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`);

--
-- Contraintes pour la table `ad__passenger`
--
ALTER TABLE `ad__passenger`
  ADD CONSTRAINT `ad__passenger_ad0_FK` FOREIGN KEY (`id_ad`) REFERENCES `ad` (`id_ad`),
  ADD CONSTRAINT `ad__passenger_user1_FK` FOREIGN KEY (`id_user__passenger`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `center`
--
ALTER TABLE `center`
  ADD CONSTRAINT `center_address0_FK` FOREIGN KEY (`id_address`) REFERENCES `address` (`id_address`);

--
-- Contraintes pour la table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_country0_FK` FOREIGN KEY (`alpha2_country`) REFERENCES `country` (`alpha2_country`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_user0_FK` FOREIGN KEY (`id_user__message_recipient`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `message_user1_FK` FOREIGN KEY (`id_user__message_writer`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `opinion_score1_FK` FOREIGN KEY (`id_score`) REFERENCES `score` (`id_score`),
  ADD CONSTRAINT `opinion_user0_FK` FOREIGN KEY (`id_user__opinion_recipient`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `opinion_user2_FK` FOREIGN KEY (`id_user__opinion_writer`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `page_center0_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Contraintes pour la table `profile_report`
--
ALTER TABLE `profile_report`
  ADD CONSTRAINT `profile_report_user0_FK` FOREIGN KEY (`id_user__writer`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `profile_report_user1_FK` FOREIGN KEY (`id_user__recipient`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_center0_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_center2_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`),
  ADD CONSTRAINT `user_function0_FK` FOREIGN KEY (`id_function`) REFERENCES `function` (`id_function`),
  ADD CONSTRAINT `user_role1_FK` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);

--
-- Contraintes pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD CONSTRAINT `vehicule_user0_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `weekday`
--
ALTER TABLE `weekday`
  ADD CONSTRAINT `weekday_ad0_FK` FOREIGN KEY (`id_ad`) REFERENCES `ad` (`id_ad`),
  ADD CONSTRAINT `weekday_vehicule1_FK` FOREIGN KEY (`id_vehicule`) REFERENCES `vehicule` (`id_vehicule`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
