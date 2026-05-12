-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 11, 2025 at 04:29 PM
-- Server version: 8.0.31
-- PHP Version: 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loan_schema`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `credit_score_id` bigint UNSIGNED NOT NULL,
  `risk_score_id` bigint UNSIGNED NOT NULL,
  `credit_score` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `credit_score_details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `risk_score` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `risk_score_details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `applications_user_id_foreign` (`user_id`),
  KEY `applications_credit_score_id_foreign` (`credit_score_id`),
  KEY `applications_risk_score_id_foreign` (`risk_score_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `user_id`, `credit_score_id`, `risk_score_id`, `credit_score`, `credit_score_details`, `risk_score`, `risk_score_details`, `remarks`, `status`, `created_at`, `updated_at`) VALUES
(1, 10, 1, 1, '19', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":2,\"label\":\"Married\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":3,\"label\":\"None\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":2,\"label\":\"Employment\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":2,\"label\":\"Known to Bank\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":1,\"label\":\"Investment\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":3,\"label\":\"Current/New Client\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":1,\"label\":\"Chattel\"}]}]', '{\"definition\":\"Very low credit risk\",\"from\":90,\"to\":100,\"value\":\"1\",\"monthly_interest_rate\":1}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":5,\"label\":\"Available\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":15,\"label\":\"Strong\"}]}]', 'passed', 'pass', '2025-03-31 06:25:40', '2025-03-31 06:25:40'),
(2, 11, 1, 1, '11', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":0,\"label\":\"below 18 or 60 & above\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":3,\"label\":\"Single\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":2,\"label\":\"1 - 3 persons\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":1,\"label\":\"NO\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":1,\"label\":\"Business (Owned)\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":1,\"label\":\"New Customer\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":1,\"label\":\"Investment\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":2,\"label\":\"Deliquent/Past Due\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":0,\"label\":\"Co-Barrowers\"}]}]', '{}', '{}', 'did not pass', 'fail', '2025-03-31 06:29:26', '2025-03-31 06:29:26'),
(3, 12, 1, 1, '20', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":2,\"label\":\"Married\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":2,\"label\":\"1 - 3 persons\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":2,\"label\":\"Employment\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":2,\"label\":\"Known to Bank\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":1,\"label\":\"Investment\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":3,\"label\":\"Current/New Client\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":3,\"label\":\"Title/Deposit Hold-Out\"}]}]', '{\"definition\":\"Low credit risk\",\"from\":81,\"to\":89,\"value\":\"2\",\"monthly_interest_rate\":1.2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":5,\"label\":\"sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":5,\"label\":\"sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":5,\"label\":\"Available\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":15,\"label\":\"Strong\"}]}]', 'passed', 'pass', '2025-04-04 08:10:32', '2025-04-04 08:10:32'),
(4, 13, 1, 1, '23', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":3,\"label\":\"Single\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":3,\"label\":\"None\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":2,\"label\":\"Employment\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":2,\"label\":\"Known to Bank\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":2,\"label\":\"Working Capital\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":3,\"label\":\"Current/New Client\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":3,\"label\":\"Title/Deposit Hold-Out\"}]}]', '{\"definition\":\"Moderate credit risk\",\"from\":71,\"to\":80,\"value\":\"3\",\"monthly_interest_rate\":1.5}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":5,\"label\":\"sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":3,\"label\":\"Normal\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":1,\"label\":\"none\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":10,\"label\":\"Medium\"}]}]', 'passed', 'pass', '2025-04-04 08:19:47', '2025-04-04 08:19:47'),
(5, 14, 1, 1, '16', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":2,\"label\":\"Married\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":3,\"label\":\"None\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":1,\"label\":\"Business (Owned)\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":1,\"label\":\"New Customer\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":0,\"label\":\"Consumption\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":3,\"label\":\"Current/New Client\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":1,\"label\":\"Chattel\"}]}]', '{\"definition\":\"Low credit risk\",\"from\":81,\"to\":89,\"value\":\"2\",\"monthly_interest_rate\":1.2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":3,\"label\":\"Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":5,\"label\":\"Available\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":10,\"label\":\"Medium\"}]}]', 'passed', 'pass', '2025-04-04 08:23:29', '2025-04-04 08:23:29'),
(6, 15, 1, 1, '20', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":3,\"label\":\"Single\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":3,\"label\":\"None\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":2,\"label\":\"Employment\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":1,\"label\":\"New Customer\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":0,\"label\":\"Consumption\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":3,\"label\":\"Current/New Client\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":3,\"label\":\"Title/Deposit Hold-Out\"}]}]', '{\"definition\":\"Low credit risk\",\"from\":81,\"to\":89,\"value\":\"2\",\"monthly_interest_rate\":1.2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":5,\"label\":\"sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":3,\"label\":\"Normal\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":1,\"label\":\"none\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":15,\"label\":\"Strong\"}]}]', 'passed', 'pass', '2025-04-04 08:26:42', '2025-04-04 08:26:42'),
(7, 16, 1, 1, '21', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":2,\"label\":\"Married\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":3,\"label\":\"None\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":2,\"label\":\"Employment\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":2,\"label\":\"Known to Bank\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":1,\"label\":\"Investment\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":3,\"label\":\"Current/New Client\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":3,\"label\":\"Title/Deposit Hold-Out\"}]}]', '{\"definition\":\"High credit risk\",\"from\":61,\"to\":70,\"value\":\"4\",\"monthly_interest_rate\":2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":1,\"label\":\"deficit\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":5,\"label\":\"sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":1,\"label\":\"Sickly\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":1,\"label\":\"none\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":10,\"label\":\"Medium\"}]}]', 'passed', 'pass', '2025-04-04 08:30:31', '2025-04-04 08:30:31'),
(8, 21, 16, 1, '50', '[{\"category\":\"Income Stability\",\"criteria\":[{\"id\":1,\"description\":\"Monthly income consistency over the past year.\",\"score\":5,\"label\":\"Occasional fluctuations\"}]},{\"category\":\"Income Diversification\",\"criteria\":[{\"id\":3,\"description\":\"Presence of additional income sources\",\"score\":5,\"label\":\"single stable source\"}]},{\"category\":\"Payment Timelines\",\"criteria\":[{\"id\":4,\"description\":\"Payment history for existing loans or credit cards\",\"score\":10,\"label\":\"no missed payments\"}]},{\"category\":\"Credit Tenure\",\"criteria\":[{\"id\":5,\"description\":\"Length of credit history (in years).\",\"score\":10,\"label\":\"5+ years\"}]},{\"category\":\" Debt-to-Income Ratio.\",\"criteria\":[{\"id\":6,\"description\":\"Total debt as a percentage of monthly income.\",\"score\":10,\"label\":\"<30%\"}]},{\"category\":\"Purpose Feasibility\",\"criteria\":[{\"id\":7,\"description\":\"Alignment of loan purpose with investment.  (e.g., business growth or infrastructure improvement).\",\"score\":10,\"label\":\"High\"}]}]', '{\"definition\":\"Low credit risk\",\"from\":81,\"to\":89,\"value\":\"2\",\"monthly_interest_rate\":1.2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":5,\"label\":\"Available\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":10,\"label\":\"Medium\"}]}]', 'passed', 'pass', '2025-04-04 08:57:27', '2025-04-04 08:57:27'),
(9, 17, 1, 1, '20', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":2,\"label\":\"Married\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":3,\"label\":\"None\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":2,\"label\":\"Employment\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":2,\"label\":\"Known to Bank\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":1,\"label\":\"Investment\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":2,\"label\":\"Deliquent/Past Due\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":3,\"label\":\"Title/Deposit Hold-Out\"}]}]', '{\"definition\":\"High credit risk\",\"from\":61,\"to\":70,\"value\":\"4\",\"monthly_interest_rate\":2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":5,\"label\":\"sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":5,\"label\":\"sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":2,\"label\":\"Delinquent\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":3,\"label\":\"Delinquent\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":3,\"label\":\"Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":1,\"label\":\"none\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":10,\"label\":\"Medium\"}]}]', 'will look', 'pass', '2025-04-04 21:00:47', '2025-04-04 21:00:47'),
(10, 18, 1, 1, '19', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":2,\"label\":\"Married\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":3,\"label\":\"None\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":2,\"label\":\"Employment\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":1,\"label\":\"New Customer\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":0,\"label\":\"Consumption\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":3,\"label\":\"Current/New Client\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":3,\"label\":\"Title/Deposit Hold-Out\"}]}]', '{\"definition\":\"Low credit risk\",\"from\":81,\"to\":89,\"value\":\"2\",\"monthly_interest_rate\":1.2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":1,\"label\":\"none\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":10,\"label\":\"Medium\"}]}]', 'passed', 'pass', '2025-04-04 21:04:14', '2025-04-04 21:04:14'),
(11, 12, 16, 1, '50', '[{\"category\":\"Income Stability\",\"criteria\":[{\"id\":1,\"description\":\"Monthly income consistency over the past year.\",\"score\":10,\"label\":\"Consistent Income\"}]},{\"category\":\"Income Diversification\",\"criteria\":[{\"id\":3,\"description\":\"Presence of additional income sources\",\"score\":10,\"label\":\"diverse income sources\"}]},{\"category\":\"Payment Timelines\",\"criteria\":[{\"id\":4,\"description\":\"Payment history for existing loans or credit cards\",\"score\":10,\"label\":\"no missed payments\"}]},{\"category\":\"Credit Tenure\",\"criteria\":[{\"id\":5,\"description\":\"Length of credit history (in years).\",\"score\":10,\"label\":\"5+ years\"}]},{\"category\":\" Debt-to-Income Ratio.\",\"criteria\":[{\"id\":6,\"description\":\"Total debt as a percentage of monthly income.\",\"score\":5,\"label\":\"30%-50%\"}]},{\"category\":\"Purpose Feasibility\",\"criteria\":[{\"id\":7,\"description\":\"Alignment of loan purpose with investment.  (e.g., business growth or infrastructure improvement).\",\"score\":5,\"label\":\"Moderate\"}]}]', '{\"definition\":\"Low credit risk\",\"from\":81,\"to\":89,\"value\":\"2\",\"monthly_interest_rate\":1.2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":3,\"label\":\"For training\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":10,\"label\":\"Medium\"}]}]', 'passed', 'pass', '2025-04-04 21:41:45', '2025-04-04 21:41:45'),
(12, 12, 17, 1, '80', '[{\"category\":\"Employment Status\",\"criteria\":[{\"id\":1,\"description\":\"Current job status\",\"score\":20,\"label\":\"Regular\"},{\"id\":2,\"description\":\"Average monthly net income\",\"score\":20,\"label\":\"100,000 +\"}]},{\"category\":\"Employment Length\",\"criteria\":[{\"id\":3,\"description\":\"How long the borrower has been in current job/business\",\"score\":10,\"label\":\"2-4 years\"}]},{\"category\":\"Existing Debts\",\"criteria\":[{\"id\":4,\"description\":\"Current outstanding loan or credit card debts\",\"score\":10,\"label\":\"less than 30% of income\"}]},{\"category\":\"Credit History\",\"criteria\":[{\"id\":5,\"description\":\"History of payments (from credit report or record)\",\"score\":10,\"label\":\"good\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":6,\"description\":\"Value of car vs down payment\",\"score\":10,\"label\":\"30–49%\"}]}]', '{\"definition\":\"Very low credit risk\",\"from\":90,\"to\":100,\"value\":\"1\",\"monthly_interest_rate\":1}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":5,\"label\":\"Available\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":15,\"label\":\"Strong\"}]}]', 'passed', 'pass', '2025-04-06 04:45:30', '2025-04-06 04:45:30'),
(13, 13, 17, 1, '22', '[{\"category\":\"Employment Status\",\"criteria\":[{\"id\":1,\"description\":\"Current job status\",\"score\":1,\"label\":\"Unemployed\"},{\"id\":2,\"description\":\"Average monthly net income\",\"score\":5,\"label\":\"below 20,000\"}]},{\"category\":\"Employment Length\",\"criteria\":[{\"id\":3,\"description\":\"How long the borrower has been in current job/business\",\"score\":5,\"label\":\"less than 2 years\"}]},{\"category\":\"Existing Debts\",\"criteria\":[{\"id\":4,\"description\":\"Current outstanding loan or credit card debts\",\"score\":1,\"label\":\"more than 50% income\"}]},{\"category\":\"Credit History\",\"criteria\":[{\"id\":5,\"description\":\"History of payments (from credit report or record)\",\"score\":5,\"label\":\"fair\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":6,\"description\":\"Value of car vs down payment\",\"score\":5,\"label\":\"10–29%\"}]}]', '{}', '{}', 'not passed', 'fail', '2025-04-06 04:46:25', '2025-04-06 04:46:25'),
(14, 25, 1, 1, '21', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"score\":3,\"label\":\"26-59 years old\"},{\"id\":2,\"description\":\"CIVIL STATUS\",\"score\":3,\"label\":\"Single\"},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"score\":3,\"label\":\"None\"},{\"id\":4,\"description\":\"RESIDENCY\",\"score\":2,\"label\":\"YES\"},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"score\":2,\"label\":\"Employment\"}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"score\":1,\"label\":\"New Customer\"},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"score\":2,\"label\":\"Working Capital\"},{\"id\":8,\"description\":\"LOAN STATUS\",\"score\":3,\"label\":\"Current/New Client\"},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"score\":2,\"label\":\"Tax Declaration\"}]}]', '{\"definition\":\"Low credit risk\",\"from\":81,\"to\":89,\"value\":\"2\",\"monthly_interest_rate\":1.2}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":1,\"label\":\"none\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":10,\"label\":\"Medium\"}]}]', 'passed.', 'pass', '2025-04-07 02:40:40', '2025-04-07 02:40:40'),
(15, 25, 17, 1, '18', '[{\"category\":\"Employment Status\",\"criteria\":[{\"id\":1,\"description\":\"Current job status\",\"score\":1,\"label\":\"Unemployed\"},{\"id\":2,\"description\":\"Average monthly net income\",\"score\":5,\"label\":\"below 20,000\"}]},{\"category\":\"Employment Length\",\"criteria\":[{\"id\":3,\"description\":\"How long the borrower has been in current job/business\",\"score\":1,\"label\":\"No employment record\"}]},{\"category\":\"Existing Debts\",\"criteria\":[{\"id\":4,\"description\":\"Current outstanding loan or credit card debts\",\"score\":1,\"label\":\"more than 50% income\"}]},{\"category\":\"Credit History\",\"criteria\":[{\"id\":5,\"description\":\"History of payments (from credit report or record)\",\"score\":5,\"label\":\"fair\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":6,\"description\":\"Value of car vs down payment\",\"score\":5,\"label\":\"10–29%\"}]}]', '{}', '{}', 'not passed', 'fail', '2025-04-07 02:41:50', '2025-04-07 02:41:50'),
(16, 22, 17, 1, '95', '[{\"category\":\"Employment Status\",\"criteria\":[{\"id\":1,\"description\":\"Current job status\",\"score\":20,\"label\":\"Regular\"},{\"id\":2,\"description\":\"Average monthly net income\",\"score\":20,\"label\":\"100,000 +\"}]},{\"category\":\"Employment Length\",\"criteria\":[{\"id\":3,\"description\":\"How long the borrower has been in current job/business\",\"score\":15,\"label\":\"5 years above\"}]},{\"category\":\"Existing Debts\",\"criteria\":[{\"id\":4,\"description\":\"Current outstanding loan or credit card debts\",\"score\":15,\"label\":\"none\"}]},{\"category\":\"Credit History\",\"criteria\":[{\"id\":5,\"description\":\"History of payments (from credit report or record)\",\"score\":15,\"label\":\"excellent\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":6,\"description\":\"Value of car vs down payment\",\"score\":10,\"label\":\"30–49%\"}]}]', '{\"definition\":\"Very low credit risk\",\"from\":90,\"to\":100,\"value\":\"1\",\"monthly_interest_rate\":1}', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":2,\"description\":\"Deb Service Ratio\",\"score\":10,\"label\":\"More than sufficient\"},{\"id\":3,\"description\":\"Repayment History\",\"score\":3,\"label\":\"Good\"}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"score\":6,\"label\":\"Good\"},{\"id\":5,\"description\":\"Community Relations\",\"score\":6,\"label\":\"Peaceful & Trusting\"},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"score\":6,\"label\":\"Very Good\"},{\"id\":7,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":8,\"description\":\"Quality of Family Life\",\"score\":6,\"label\":\"Orderly & Simple\"},{\"id\":9,\"description\":\"Impression during Interview\",\"score\":6,\"label\":\"Positive & helpful\"},{\"id\":10,\"description\":\"Competence with livelihood\",\"score\":5,\"label\":\"High\"}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"score\":5,\"label\":\"Available\"},{\"id\":12,\"description\":\"Impact of competition\",\"score\":5,\"label\":\"Low effect\"},{\"id\":13,\"description\":\"Impact of any new regulation\",\"score\":5,\"label\":\"Low effect\"}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"score\":15,\"label\":\"Strong\"}]}]', 'passed', 'pass', '2025-08-10 10:20:16', '2025-08-10 10:20:16');

-- --------------------------------------------------------

--
-- Table structure for table `credit_scores`
--

DROP TABLE IF EXISTS `credit_scores`;
CREATE TABLE IF NOT EXISTS `credit_scores` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `passing_score` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `score_form` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `credit_scores_name_unique` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `credit_scores`
--

INSERT INTO `credit_scores` (`id`, `name`, `passing_score`, `score_form`, `created_at`, `updated_at`) VALUES
(1, 'Loan Credit Score', '[{\"definition\":\"Pass\",\"from\":12,\"to\":99,\"value\":\"pass\"}]', '[{\"category\":\"APPLICANT AND PERSONAL SITUATION\",\"criteria\":[{\"id\":1,\"description\":\"AGE\",\"scoring\":[{\"label\":\"26-59 years old\",\"score\":3},{\"label\":\"18-25 years old\",\"score\":1},{\"label\":\"below 18 or 60 & above\",\"score\":0}]},{\"id\":2,\"description\":\"CIVIL STATUS\",\"scoring\":[{\"label\":\"Single\",\"score\":3},{\"label\":\"Married\",\"score\":2},{\"label\":\"Widow/Widower/Separated\",\"score\":1}]},{\"id\":3,\"description\":\"DEPENDENTS without own MEANS\",\"scoring\":[{\"label\":\"None\",\"score\":3},{\"label\":\"1 - 3 persons\",\"score\":2},{\"label\":\"4 - 5 persons\",\"score\":1},{\"label\":\"More than 5 perons\",\"score\":0}]},{\"id\":4,\"description\":\"RESIDENCY\",\"scoring\":[{\"label\":\"YES\",\"score\":2},{\"label\":\"NO\",\"score\":1}]},{\"id\":5,\"description\":\"SOURCE OF INCOME\",\"scoring\":[{\"label\":\"Employment\",\"score\":2},{\"label\":\"Business (Owned)\",\"score\":1}]}]},{\"category\":\"LOANS\",\"criteria\":[{\"id\":6,\"description\":\"BANK RELATIONSHIP\",\"scoring\":[{\"label\":\"Known to Bank\",\"score\":2},{\"label\":\"New Customer\",\"score\":1}]},{\"id\":7,\"description\":\"LOAN PURPOSE\",\"scoring\":[{\"label\":\"Working Capital\",\"score\":2},{\"label\":\"Investment\",\"score\":1},{\"label\":\"Consumption\",\"score\":0}]},{\"id\":8,\"description\":\"LOAN STATUS\",\"scoring\":[{\"label\":\"Current/New Client\",\"score\":3},{\"label\":\"Deliquent/Past Due\",\"score\":2}]},{\"id\":9,\"description\":\"FORM OF COLLATERAL\",\"scoring\":[{\"label\":\"Title/Deposit Hold-Out\",\"score\":3},{\"label\":\"Tax Declaration\",\"score\":2},{\"label\":\"Chattel\",\"score\":1},{\"label\":\"Co-Barrowers\",\"score\":0}]}]}]', '2025-02-22 02:12:11', '2025-02-22 02:14:32'),
(16, 'Personal Loan', '[{\"definition\":\"The passing score represents 75% of the total maximum score (45 out of 60), indicating that the applicant meets the majority of credit evaluation criteria with financial stability and responsibility.\",\"from\":\"45\",\"to\":100,\"value\":null,\"monthly_intereset_rate\":null}]', '[{\"category\":\"Income Stability\",\"criteria\":[{\"id\":1,\"description\":\"Monthly income consistency over the past year.\",\"scoring\":[{\"label\":\"Consistent Income\",\"score\":10},{\"label\":\"Occasional fluctuations\",\"score\":5},{\"label\":\"Inconsistent Income\",\"score\":1}]}]},{\"category\":\"Income Diversification\",\"criteria\":[{\"id\":3,\"description\":\"Presence of additional income sources\",\"scoring\":[{\"label\":\"diverse income sources\",\"score\":10},{\"label\":\"single stable source\",\"score\":5},{\"label\":\"no additional sources\",\"score\":1}]}]},{\"category\":\"Payment Timelines\",\"criteria\":[{\"id\":4,\"description\":\"Payment history for existing loans or credit cards\",\"scoring\":[{\"label\":\"no missed payments\",\"score\":10},{\"label\":\"occasional delays\",\"score\":5},{\"label\":\"frequent missed payments\",\"score\":1}]}]},{\"category\":\"Credit Tenure\",\"criteria\":[{\"id\":5,\"description\":\"Length of credit history (in years).\",\"scoring\":[{\"label\":\"5+ years\",\"score\":10},{\"label\":\"2-5\",\"score\":5},{\"label\":\"less than 2 years\",\"score\":1}]}]},{\"category\":\" Debt-to-Income Ratio.\",\"criteria\":[{\"id\":6,\"description\":\"Total debt as a percentage of monthly income.\",\"scoring\":[{\"label\":\"<30%\",\"score\":10},{\"label\":\"30%-50%\",\"score\":5},{\"label\":\">50%\",\"score\":1}]}]},{\"category\":\"Purpose Feasibility\",\"criteria\":[{\"id\":7,\"description\":\"Alignment of loan purpose with investment.  (e.g., business growth or infrastructure improvement).\",\"scoring\":[{\"label\":\"High\",\"score\":10},{\"label\":\"Moderate\",\"score\":5},{\"label\":\"Low\",\"score\":1}]}]}]', '2025-04-04 08:55:29', '2025-04-04 08:55:29'),
(17, 'Car Loan', '[{\"definition\":\"A car loan, also known as an auto loan or automobile loan, is a type of loan used to finance the purchase of a vehicle,\",\"from\":\"60\",\"to\":100,\"value\":null,\"monthly_intereset_rate\":null}]', '[{\"category\":\"Employment Status\",\"criteria\":[{\"id\":1,\"description\":\"Current job status\",\"scoring\":[{\"label\":\"Regular\",\"score\":20},{\"label\":\"Contractual \",\"score\":10},{\"label\":\"Self-employed\",\"score\":15},{\"label\":\"Unemployed\",\"score\":1}]},{\"id\":2,\"description\":\"Average monthly net income\",\"scoring\":[{\"label\":\"100,000 +\",\"score\":20},{\"label\":\"50,000-99,999\",\"score\":15},{\"label\":\"20,000-49,999\",\"score\":10},{\"label\":\"below 20,000\",\"score\":5}]}]},{\"category\":\"Employment Length\",\"criteria\":[{\"id\":3,\"description\":\"How long the borrower has been in current job/business\",\"scoring\":[{\"label\":\"5 years above\",\"score\":15},{\"label\":\"2-4 years\",\"score\":10},{\"label\":\"less than 2 years\",\"score\":5},{\"label\":\"No employment record\",\"score\":1}]}]},{\"category\":\"Existing Debts\",\"criteria\":[{\"id\":4,\"description\":\"Current outstanding loan or credit card debts\",\"scoring\":[{\"label\":\"none\",\"score\":15},{\"label\":\"less than 30% of income\",\"score\":10},{\"label\":\"30-50% of income\",\"score\":5},{\"label\":\"more than 50% income\",\"score\":1},{\"label\":\"none\",\"score\":1}]}]},{\"category\":\"Credit History\",\"criteria\":[{\"id\":5,\"description\":\"History of payments (from credit report or record)\",\"scoring\":[{\"label\":\"excellent\",\"score\":15},{\"label\":\"good\",\"score\":10},{\"label\":\"fair\",\"score\":5},{\"label\":\"poor\",\"score\":1}]}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":6,\"description\":\"Value of car vs down payment\",\"scoring\":[{\"label\":\"50% or more of car price as down payment\",\"score\":15},{\"label\":\"30–49%\",\"score\":10},{\"label\":\"10–29%\",\"score\":5},{\"label\":\"No down payment\",\"score\":1}]}]}]', '2025-04-06 04:42:45', '2025-04-06 04:42:45'),
(18, 'Agriculture Loan', '[{\"definition\":\"loan for agricultural needs\",\"from\":\"5\",\"to\":100,\"value\":null,\"monthly_intereset_rate\":null}]', '[{\"category\":\"Credit History\",\"criteria\":[{\"id\":1,\"description\":\"Debt to Income\",\"scoring\":[{\"label\":\"less than 20%\",\"score\":5},{\"label\":\"20-50%\",\"score\":3},{\"label\":\"more than 50%\",\"score\":1}]}]}]', '2025-04-07 02:37:28', '2025-04-07 02:37:28'),
(19, 'NEW CREDIT SCORE', '[{\"definition\":\"Pass\",\"from\":100,\"to\":100,\"value\":null,\"monthly_intereset_rate\":null}]', '[{\"category\":\"FAMILIY 2\",\"criteria\":[{\"id\":1,\"description\":\"Asd\",\"scoring\":[{\"label\":\"Qwe\",\"score\":0},{\"label\":\"Asd\",\"score\":1}]}]},{\"category\":\"FAMILIY 3\",\"criteria\":[{\"id\":5,\"description\":\"Asdasdsadasdasdasd\",\"scoring\":[{\"label\":\"Asdasdasd\",\"score\":2}]}]}]', '2025-09-07 04:11:04', '2025-09-07 04:11:04'),
(20, 'NEW CREDIT SCORE 2', '[{\"definition\":\"Pass\",\"from\":123213,\"to\":100,\"value\":null,\"monthly_intereset_rate\":null}]', '[{\"category\":\"FAMILIY\",\"criteria\":[{\"id\":1,\"description\":\"Status\",\"scoring\":[{\"label\":\"Qwe\",\"score\":2},{\"label\":\"Wqeqw\",\"score\":4}]}]}]', '2025-09-07 04:18:35', '2025-09-07 04:18:35'),
(21, 'Test', '[{\"definition\":\"Asdasd\",\"from\":1100,\"to\":100,\"value\":null,\"monthly_intereset_rate\":null}]', '[{\"category\":\"Dasdas\",\"criteria\":[{\"id\":1,\"description\":\"Sadasd\",\"scoring\":[{\"label\":\"Dsadasd\",\"score\":200},{\"label\":\"Gfgdfg\",\"score\":400}]}]}]', '2025-09-07 05:42:05', '2025-09-07 05:42:05');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(40, '2014_10_12_000000_create_users_table', 1),
(41, '2014_10_12_100000_create_password_resets_table', 1),
(42, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(43, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(44, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(45, '2016_06_01_000004_create_oauth_clients_table', 1),
(46, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(47, '2019_08_19_000000_create_failed_jobs_table', 1),
(48, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(49, '2025_02_22_044628_create_applications_table', 1),
(50, '2025_02_22_044728_create_credit_scores_table', 1),
(51, '2025_02_22_044742_create_risk_scores_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0645ff0356d2f81e4ecc8512bcfc91b9e5d1ba726250c4eaafc47d949a60faacc6d813b3a9fbd02f', 1, 1, 'loanapp', '[]', 0, '2025-02-22 02:11:19', '2025-02-22 02:11:19', '2026-02-22 06:11:19'),
('5f4df9a425ddcad015866e5729edc73e7c4fb1f7fd7c13630ff5d982c3cc06ddfd3d15bcb237f8bb', 1, 1, 'loanapp', '[]', 0, '2025-02-22 02:15:20', '2025-02-22 02:15:20', '2026-02-22 06:15:20'),
('61622a64b778373a84ebc70fce111ef95bbf9ba57170e4cbd41651fde4c91fb5a24cc9d3fb0e3d1a', 2, 1, 'loanapp', '[]', 0, '2025-02-22 02:16:49', '2025-02-22 02:16:49', '2026-02-22 06:16:49'),
('1ea2b0181b33297a2a50f9aecdd3ffe1bd0c1e3dae78cd759bfbdf8f7bbfafcfcbcad530b96f5e90', 3, 1, 'loanapp', '[]', 0, '2025-02-22 02:18:37', '2025-02-22 02:18:37', '2026-02-22 06:18:37'),
('b36c94f0ba49f892bd741cba95ad66a0819b99bb002461c8955daebccd5c2199fa5f4686cd7ea672', 1, 1, 'loanapp', '[]', 0, '2025-02-22 04:26:23', '2025-02-22 04:26:23', '2026-02-22 08:26:23'),
('dee3a7d676d160848d96bc5edbf5d5c0fad02a6de434452ee94fa0eb50a3d44e0e82ad658c7ecb5c', 1, 1, 'loanapp', '[]', 0, '2025-02-22 04:33:15', '2025-02-22 04:33:15', '2026-02-22 08:33:15'),
('aa8c9c537c2106b5e0d99eb3b1b8727712b307cd19a7886c11316677fc0e891e3ccfb9904757438b', 1, 1, 'loanapp', '[]', 0, '2025-02-22 04:35:01', '2025-02-22 04:35:01', '2026-02-22 08:35:01'),
('4ad7d4011419dcbdda66a8ab5ae8c81c7d5110eda517eb068ff980e8c994f0b08dd6586d7c98a3c2', 1, 1, 'loanapp', '[]', 0, '2025-02-22 13:22:58', '2025-02-22 13:22:58', '2026-02-22 17:22:58'),
('762765ac162bd864e1dd5e9e5ddc1171e618f658e595830c23806df5cc104c5609c63e37177460d4', 4, 1, 'loanapp', '[]', 0, '2025-02-22 20:47:20', '2025-02-22 20:47:20', '2026-02-23 00:47:20'),
('b5b2534f99549c5dfb432026e72aa51421dd83bb806536f91d0e440a5804709493df75a9b4676447', 5, 1, 'loanapp', '[]', 0, '2025-02-23 01:43:31', '2025-02-23 01:43:31', '2026-02-23 05:43:31'),
('5ec032d9b1e63a21b27aebd74b9edea1d80928114ad06cda988bc1932b3dac0242cb92004a58f1d5', 6, 1, 'loanapp', '[]', 0, '2025-02-23 01:45:04', '2025-02-23 01:45:04', '2026-02-23 05:45:04'),
('380f2b2b74b6b23befdc49ca435ce0e95edf211bdc4fe9021b1105b9d7117df65ac471f8b4253f25', 1, 1, 'loanapp', '[]', 0, '2025-02-23 01:46:04', '2025-02-23 01:46:04', '2026-02-23 05:46:04'),
('b04b5253abac76e3f9e88b468c0e6a74d9f0def4e46a5eae4b05a29f82fa404a06904911ea0c2ac4', 7, 1, 'loanapp', '[]', 0, '2025-02-23 01:47:02', '2025-02-23 01:47:02', '2026-02-23 05:47:02'),
('da7fb54edd49891d0ec2e469a9d001a9e48b820cda19ad321be26b224e7a09d3646e9ad811194159', 6, 1, 'loanapp', '[]', 0, '2025-02-23 02:38:56', '2025-02-23 02:38:56', '2026-02-23 06:38:56'),
('9a0b0c63db1fe1088ca51fcd8b38b74e39c4068c69eba8929a8568adce02a6200495126229ca74c6', 1, 1, 'loanapp', '[]', 0, '2025-03-09 11:15:33', '2025-03-09 11:15:33', '2026-03-09 15:15:33'),
('7a63336b9f1dc59b8c3a944b2ea5fe5b23c999db305c44aab83fc4e8aa77b637f12dbb4235e10e15', 8, 1, 'loanapp', '[]', 0, '2025-03-09 11:15:53', '2025-03-09 11:15:53', '2026-03-09 15:15:53'),
('0b2ab3c315f92e771c15b43f99845f0b278e822b86c92d6a3bd7ea694d8271527c1d337502669b61', 1, 1, 'loanapp', '[]', 0, '2025-03-11 10:10:41', '2025-03-11 10:10:41', '2026-03-11 14:10:41'),
('d1e606fe44854148b591eb2f8df8f9c7cb494ea301dd501afac1475a4b67bf1131c644c3dc00fb2e', 6, 1, 'loanapp', '[]', 0, '2025-03-11 11:54:49', '2025-03-11 11:54:49', '2026-03-11 15:54:49'),
('f37dca2ef60cf57542e42619a7e30d373249c997f639a468b75d963c23b8cc984dbead250aeb0a69', 9, 1, 'loanapp', '[]', 0, '2025-03-11 11:58:13', '2025-03-11 11:58:13', '2026-03-11 15:58:13'),
('bb43f9080c62b5182b66f63964bae7f468be7a08e2bc11ea0b1738620c293a783ac2f43567723e07', 9, 1, 'loanapp', '[]', 0, '2025-03-11 12:11:28', '2025-03-11 12:11:28', '2026-03-11 16:11:28'),
('0bf47b19915bdc7f3f62dc45b7aa551c5c694dcb952e1ae7272760a1c7077d8d69314356d6bc71c8', 9, 1, 'loanapp', '[]', 0, '2025-03-13 16:16:54', '2025-03-13 16:16:54', '2026-03-13 20:16:54'),
('064cc64a52bf65b681ed203732d5ecd50cc78eca098f3ce46b02bad30f82d24e08f15c1ed7d3cb4a', 9, 1, 'loanapp', '[]', 0, '2025-03-13 16:27:24', '2025-03-13 16:27:24', '2026-03-13 20:27:24'),
('118b20dbd6a9052d93eb2707407a7aaa4acf5359310a812e653ffc4823c7a4a642158608b936fa47', 2, 1, 'loanapp', '[]', 0, '2025-03-13 16:27:32', '2025-03-13 16:27:32', '2026-03-13 20:27:32'),
('7311376875fa56dfcc9500901af55f8d5650cf23a1353b1dc820e4b8981ab1b221e0dcd2d5b3035b', 9, 1, 'loanapp', '[]', 0, '2025-03-16 11:51:31', '2025-03-16 11:51:31', '2026-03-16 15:51:31'),
('b25c02eefa32da4ecd3af18f174d443d2fa11c045b2c8c602d53d1392cdca6353bb07ab9c4c8b74d', 9, 1, 'loanapp', '[]', 0, '2025-03-16 11:52:01', '2025-03-16 11:52:01', '2026-03-16 15:52:01'),
('a0782fac77b67661702c37e57ebfabaaf03089cfb8074adaee2092f24378489850639094f3813bc2', 9, 1, 'loanapp', '[]', 0, '2025-03-16 11:52:10', '2025-03-16 11:52:10', '2026-03-16 15:52:10'),
('1f256ba02673c225a1126fb6c6a42b4944345ac3e6835083efdd601ea9352800548efccd6d566530', 1, 1, 'loanapp', '[]', 0, '2025-03-16 11:52:31', '2025-03-16 11:52:31', '2026-03-16 15:52:31'),
('20ad7f40101baec8120b7ad1fdfdc2e2f77b37e9e8f4a650420a52b4e985f09820ec5ca7278ae66f', 1, 1, 'loanapp', '[]', 0, '2025-03-16 14:09:13', '2025-03-16 14:09:14', '2026-03-16 18:09:13'),
('cc600833d8f5771d836ea1c21058e209769980e708a50dea1876ec33f399da5e0ca169712ca7c41c', 9, 1, 'loanapp', '[]', 0, '2025-03-16 15:39:55', '2025-03-16 15:39:55', '2026-03-16 19:39:55'),
('e9c24e6b382fcfd942d35e91d7147fa72384aecfe03efc81d03b12c3abb68f93c40de0d4cb33d7ea', 2, 1, 'loanapp', '[]', 0, '2025-03-16 15:45:16', '2025-03-16 15:45:17', '2026-03-16 19:45:16'),
('04b98374114b05ae29e8cfe2491c38b5d79e3dbc7c59270db0cd2593682433424a69781c2db1991e', 9, 1, 'loanapp', '[]', 0, '2025-03-16 15:47:31', '2025-03-16 15:47:31', '2026-03-16 19:47:31'),
('9eb7e802e5e55ebe47adc48a278b7b2e9ef839ba3ed6675b902476e6f62df15fb48e670edf3a3c90', 2, 1, 'loanapp', '[]', 0, '2025-03-16 15:50:48', '2025-03-16 15:50:48', '2026-03-16 19:50:48'),
('07d195d7728fa2f7cf663376276f2c53e0b1345182a891dad429bb65b30651a6daf9e38f13a209ba', 9, 1, 'loanapp', '[]', 0, '2025-03-16 15:54:37', '2025-03-16 15:54:37', '2026-03-16 19:54:37'),
('ea3b04adf3c98d2d8e2f4593a15022b6513e90a005730f17ca4df9a50bc07f21357765de5af427df', 2, 1, 'loanapp', '[]', 0, '2025-03-16 15:55:13', '2025-03-16 15:55:13', '2026-03-16 19:55:13'),
('ae41c2c021a83013927c90fd82b05fcfa45dfbd6e8a41c0e4e4937dc0ba858272667dcc554aab67b', 9, 1, 'loanapp', '[]', 0, '2025-03-16 15:59:17', '2025-03-16 15:59:17', '2026-03-16 19:59:17'),
('fac438108f56e28467eeac3e15f893aab6140e31f23d24068f062eedbfc3ea15d4e4e3d8b39170f6', 1, 1, 'loanapp', '[]', 0, '2025-03-16 16:00:18', '2025-03-16 16:00:18', '2026-03-16 20:00:18'),
('aeda6b3a356f7a918070de80827807778d17db9c6426b039293264a7a76f11d254e6d97e17104855', 1, 1, 'loanapp', '[]', 0, '2025-03-16 16:22:32', '2025-03-16 16:22:32', '2026-03-16 20:22:32'),
('fe5544e3e33da9677705f97a55b76f4b9d4616f894555ec21a2572bd4c51c4fc3416c2e506a2a5d6', 1, 1, 'loanapp', '[]', 0, '2025-03-21 08:02:12', '2025-03-21 08:02:12', '2026-03-21 16:02:12'),
('3001f059e24654f5d406a25a7d7c6ae2dbeb9de0bcf2b8785289cdc81230bd80641f252e46545c84', 1, 1, 'loanapp', '[]', 0, '2025-03-31 05:53:58', '2025-03-31 05:53:58', '2026-03-31 13:53:58'),
('cc59167068507d0f8b4e7e6da4a83d4a0082cd88a3faac9b9091c038dcf9a6c4e0043f36483f8438', 10, 1, 'loanapp', '[]', 0, '2025-03-31 06:22:15', '2025-03-31 06:22:15', '2026-03-31 14:22:15'),
('8cfec4146de4b48328f7477842ac5c2a754dac049b8c28e5874172768612cb4f0c4eddf5a92cbb44', 11, 1, 'loanapp', '[]', 0, '2025-03-31 06:28:05', '2025-03-31 06:28:05', '2026-03-31 14:28:05'),
('995c0ca10cf25fb7eabbc8fa1f3775104b81e9dba4ef87c964d8dffd116f0601d7fba86c6408b4f8', 1, 1, 'loanapp', '[]', 0, '2025-04-04 07:38:59', '2025-04-04 07:38:59', '2026-04-04 15:38:59'),
('96968807ab867cc796837698ca6894ac910e342a3ef28aa8000466db021a1a90403f6f584d9940ea', 12, 1, 'loanapp', '[]', 0, '2025-04-04 07:45:32', '2025-04-04 07:45:32', '2026-04-04 15:45:32'),
('e04d7859b2ebb78f7e6bc05ad82b302e0f30fdc2441120b73fd99997b95313098ad8ca2f508a9a77', 13, 1, 'loanapp', '[]', 0, '2025-04-04 07:46:14', '2025-04-04 07:46:14', '2026-04-04 15:46:14'),
('2fe1055a6099c8f39af22f1138e3fdf36d01624558f31ddc28d567bac6dad17928c136954d5e37e2', 14, 1, 'loanapp', '[]', 0, '2025-04-04 07:46:48', '2025-04-04 07:46:48', '2026-04-04 15:46:48'),
('756bdc6128df2b8c097cb768140c312dea6bc780b4e53f65da51ecf07e4f825a2b52e97dbb57146e', 15, 1, 'loanapp', '[]', 0, '2025-04-04 07:47:11', '2025-04-04 07:47:11', '2026-04-04 15:47:11'),
('a441a561356b86a90d002b5c90b5614db80c4e1024fe2f10b0a712807d4912a77a8e72c92a781c20', 16, 1, 'loanapp', '[]', 0, '2025-04-04 07:48:05', '2025-04-04 07:48:05', '2026-04-04 15:48:05'),
('d3db741af2ff72c820928c97cd66bfb022d5878f083b8f6d57bfcb5e32e0c00074a1d317be6b2cd4', 17, 1, 'loanapp', '[]', 0, '2025-04-04 07:48:40', '2025-04-04 07:48:41', '2026-04-04 15:48:40'),
('9332cce78a0731f73beafa948071f7505bae9c1196615b4939118aebdfdd0b1fbe738c41892622b7', 18, 1, 'loanapp', '[]', 0, '2025-04-04 07:49:14', '2025-04-04 07:49:14', '2026-04-04 15:49:14'),
('713c61cfe106383e7ba53dbbfef721140c75bfb610ce8b5c0c4284e8e6eb01da7c0cd7b95dd8e95f', 19, 1, 'loanapp', '[]', 0, '2025-04-04 07:49:37', '2025-04-04 07:49:37', '2026-04-04 15:49:37'),
('3760100712719cd3dfdbccad016cd0e6264b286ac68be2df5b0e6fbd626dc257c02552532fb8f743', 20, 1, 'loanapp', '[]', 0, '2025-04-04 07:49:58', '2025-04-04 07:49:58', '2026-04-04 15:49:58'),
('b9bbbb5e415880e078d45f86fae7492a84550d948ad24c66c748257b145a89180e9e69f4ee719223', 21, 1, 'loanapp', '[]', 0, '2025-04-04 07:50:20', '2025-04-04 07:50:20', '2026-04-04 15:50:20'),
('d398d01c3d7e5c85a1df2e4a71e8f7255eb8253efe46cecde52477dd25df28913d1a6d6f2dc2d676', 1, 1, 'loanapp', '[]', 0, '2025-04-04 08:32:25', '2025-04-04 08:32:25', '2026-04-04 16:32:25'),
('21cc3d139b36d7764f2985ea8794b7b73db5495e1534daff53126ae53aae2b59b2858ac7b759eafb', 1, 1, 'loanapp', '[]', 0, '2025-04-04 09:27:22', '2025-04-04 09:27:22', '2026-04-04 17:27:22'),
('2178cd4d67d5886751f594c3d598fd71c3d266913cf94943578167d95497b38cbb83ac5b7f9ee909', 1, 1, 'loanapp', '[]', 0, '2025-04-04 09:40:11', '2025-04-04 09:40:11', '2026-04-04 17:40:11'),
('d9cebaa15724f0d294fcfa625f565c1181c02b09e58dcdaf9e358bf65a55d54e9d651b476eab7b24', 1, 1, 'loanapp', '[]', 0, '2025-04-04 09:47:41', '2025-04-04 09:47:41', '2026-04-04 17:47:41'),
('b85eaa66258efef4d55956702584a7aa60608647d229bfee9e6090768382ac4e6ac37b326face2f3', 1, 1, 'loanapp', '[]', 0, '2025-04-04 09:59:02', '2025-04-04 09:59:02', '2026-04-04 17:59:02'),
('d5c309da46ddf464ef9ed2cc9a5cd4758359c14761a191920fd376c0dc1abbd97c0b6497b9322434', 1, 1, 'loanapp', '[]', 0, '2025-04-04 10:02:53', '2025-04-04 10:02:53', '2026-04-04 18:02:53'),
('804a96139be80746a5ae622a13c219e933c6e104df6004a784f9b729e2f62031cc631144855efce2', 1, 1, 'loanapp', '[]', 0, '2025-04-04 20:55:28', '2025-04-04 20:55:28', '2026-04-05 04:55:28'),
('996e26a92a7cf0d06cb19ea8964f867f32a1f1fc7c3b3c93c9b693db448158fb14042d7934a6a775', 22, 1, 'loanapp', '[]', 0, '2025-04-04 21:36:10', '2025-04-04 21:36:10', '2026-04-05 05:36:10'),
('a9341abd5f267ff00baf4ba5663b62a1622f4e300fdbbfe7ba4d363daa7cb3f52feb23ce24f3e8e2', 22, 1, 'loanapp', '[]', 0, '2025-04-04 21:36:51', '2025-04-04 21:36:51', '2026-04-05 05:36:51'),
('1539f3f8b45c44d261a1b546eb21455c7bee20c6a91808b8feac3f39d4ca75c6bc9bb7d6d1d93722', 1, 1, 'loanapp', '[]', 0, '2025-04-04 21:37:19', '2025-04-04 21:37:19', '2026-04-05 05:37:19'),
('73f4365c17a0b8e46cf0810c4e8ce3cf86ba77f942496315cbea887f47a9820bedc6cf272bfe420c', 22, 1, 'loanapp', '[]', 0, '2025-04-04 21:43:38', '2025-04-04 21:43:38', '2026-04-05 05:43:38'),
('dff563e5c7a606fa7cb57402acc9f6e6a29b368399de6ca46ebaae5e30278f3449a50125cafe3aa9', 1, 1, 'loanapp', '[]', 0, '2025-04-04 22:12:33', '2025-04-04 22:12:33', '2026-04-05 06:12:33'),
('6410dbf284f43e8a0901d5dc235d1193038b9b55a4a985e92fac20282e4e8407a61bb544d62a80d9', 1, 1, 'loanapp', '[]', 0, '2025-04-06 03:06:09', '2025-04-06 03:06:09', '2026-04-06 11:06:09'),
('d697479b8b240efe564ed5a7b1ee7faf93ea7992f4d3a4c9c453b2403fd4d8c33b6d5fcc7cd6aee7', 1, 1, 'loanapp', '[]', 0, '2025-04-06 04:25:43', '2025-04-06 04:25:43', '2026-04-06 12:25:43'),
('3e0e0272f731afaca1b23c860aa5462acb9521a4a4bbdba0533d4679639b9dbedffb1d0480ccdd01', 23, 1, 'loanapp', '[]', 0, '2025-04-06 04:27:31', '2025-04-06 04:27:31', '2026-04-06 12:27:31'),
('ad8d1b394464612d3532240aed3e789650eb96d46f2f39a94a02cf167f226085f6ed8c4962b7179e', 1, 1, 'loanapp', '[]', 0, '2025-04-07 01:58:26', '2025-04-07 01:58:27', '2026-04-07 09:58:26'),
('638f9ecd878c9e115c677e796a9ceff5078ff145bd3d2c5ef4bef4662cc2d2719c3c4dcc78c16f6c', 1, 1, 'loanapp', '[]', 0, '2025-04-07 02:29:58', '2025-04-07 02:29:58', '2026-04-07 10:29:58'),
('e33412e043a4772c049352ea8fe47915a00e28d8a7ca5a2d5b174aeff28f0c313deb5ee6fa4b9557', 24, 1, 'loanapp', '[]', 0, '2025-04-07 02:31:17', '2025-04-07 02:31:17', '2026-04-07 10:31:17'),
('85f02e6204aa0b87aa5567a091e895ff7274a4efa761487ffdcffba61f779b22e12925d98af86f7f', 25, 1, 'loanapp', '[]', 0, '2025-04-07 02:31:52', '2025-04-07 02:31:52', '2026-04-07 10:31:52'),
('1591f5aa10d77304b0f4cd4bb769aded53c5257c4cad3a8c4bdf2bb9c6fdb36f874a1912c69778fb', 1, 1, 'loanapp', '[]', 0, '2025-04-07 03:10:25', '2025-04-07 03:10:25', '2026-04-07 11:10:25'),
('3a5b899b57948057007380a101d56f63ecd61e761fe82e1cf641498db6855dd5ea2f505bd555cf29', 1, 1, 'loanapp', '[]', 0, '2025-04-07 06:18:20', '2025-04-07 06:18:20', '2026-04-07 14:18:20'),
('39a551724e526f71cc08c979e57ae8db3a5604a95d8505d1b88be79bda6713298a98a2ac4c250d50', 1, 1, 'loanapp', '[]', 0, '2025-08-10 08:52:25', '2025-08-10 08:52:25', '2026-08-10 16:52:25'),
('a18562901f5ff76015afa87a80e00b0c93d07548c8a2521b1a9801859eaaf743097935eda4a664a0', 1, 1, 'loanapp', '[]', 0, '2025-08-10 09:19:29', '2025-08-10 09:19:29', '2026-08-10 17:19:29'),
('fadb0fd52712fac1a406efbf0340eddfbe603cb3da4031b69ca533b2f696b6e434d27a2210662494', 1, 1, 'loanapp', '[]', 0, '2025-08-10 09:36:46', '2025-08-10 09:36:46', '2026-08-10 17:36:46'),
('f91a6a442228c3e99f7a1f83e49acf511394cbadf0c639bb9fb5f93e3d57be770f78df7813c6332b', 1, 1, 'loanapp', '[]', 0, '2025-08-10 09:43:29', '2025-08-10 09:43:29', '2026-08-10 17:43:29'),
('a67dc69dbdadb8da30398e72e9fbd0ac4dc3a78f618844f572ed9a57de974f2d9454a2cbf2ba43de', 1, 1, 'loanapp', '[]', 0, '2025-08-10 10:08:11', '2025-08-10 10:08:11', '2026-08-10 18:08:11'),
('3f3f538abe214050c345d8deef8425338b3a894ee60d075abf6dca554301f56a234c0a2b3727387b', 1, 1, 'loanapp', '[]', 0, '2025-08-11 01:22:17', '2025-08-11 01:22:18', '2026-08-11 09:22:17'),
('415296e3d6fd964b395c04a7584e524972033fe5d1fd5cd70d8e0087051dd66744ae7a7007309f4b', 1, 1, 'loanapp', '[]', 0, '2025-09-07 02:41:40', '2025-09-07 02:41:40', '2026-09-07 06:41:40'),
('fdd4cf3e006b166e265c92bd953afca1783e31856a8adbd911e008bd20d1d0a012b26108ca8542e0', 1, 1, 'loanapp', '[]', 0, '2025-09-11 11:33:48', '2025-09-11 11:33:49', '2026-09-11 15:33:48'),
('6a234ceff395947f0a6dc433a5eed10ea98e9c04cee481bc0a4cf480458d1242ac90846fb44ab5a7', 1, 1, 'loanapp', '[]', 0, '2025-09-11 12:02:23', '2025-09-11 12:02:23', '2026-09-11 16:02:23'),
('b0ea50a56803a39d1bc18fa5e045f359a0f4f9a7e826dd839cd799ca070beb82417a7685286e5e5b', 24, 1, 'loanapp', '[]', 0, '2025-09-11 12:14:23', '2025-09-11 12:14:23', '2026-09-11 16:14:23'),
('90be32f502852ae55ced301e46e5854ca76d9888c4b191059ff93eae281d8de4bc3ba12bd3e8d2d2', 1, 1, 'loanapp', '[]', 0, '2025-09-11 12:16:39', '2025-09-11 12:16:39', '2026-09-11 16:16:39'),
('812c95e2d1d7753838c897788bf267a86cc45cb0a4991014044589b9fdbbbae022a25a58e9a663b5', 26, 1, 'loanapp', '[]', 0, '2025-09-11 12:26:04', '2025-09-11 12:26:04', '2026-09-11 16:26:04'),
('0c5a6552101f7b1fd32a348e478c3d9aec77d4e1651d79973055742ba6f04fe11c0470d344e0114c', 24, 1, 'loanapp', '[]', 0, '2025-09-11 12:26:31', '2025-09-11 12:26:31', '2026-09-11 16:26:31'),
('60efdd4adf2d63f4e4e96f938a436f33c97ccdcb27ef03ddbf860a8ab227cc81191e23fbc63c3ada', 27, 1, 'loanapp', '[]', 0, '2025-09-11 12:27:18', '2025-09-11 12:27:18', '2026-09-11 16:27:18');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
CREATE TABLE IF NOT EXISTS `oauth_auth_codes` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
CREATE TABLE IF NOT EXISTS `oauth_clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Loan App Personal Access Client', '8hNoYqUlxcQtbsxIBzToCItD6wS7sCXNZBXJr9lS', NULL, 'http://localhost', 1, 0, 0, '2025-02-22 02:11:02', '2025-02-22 02:11:02'),
(2, NULL, 'Loan App Password Grant Client', '9DyG8H1OyTGMDfZqOO2sGDdSjPp78ZvD85Pqamok', 'users', 'http://localhost', 0, 1, 0, '2025-02-22 02:11:02', '2025-02-22 02:11:02');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
CREATE TABLE IF NOT EXISTS `oauth_personal_access_clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-02-22 02:11:02', '2025-02-22 02:11:02');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_refresh_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `risk_scores`
--

DROP TABLE IF EXISTS `risk_scores`;
CREATE TABLE IF NOT EXISTS `risk_scores` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `passing_score` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `score_form` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `risk_scores_name_unique` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `risk_scores`
--

INSERT INTO `risk_scores` (`id`, `name`, `passing_score`, `score_form`, `created_at`, `updated_at`) VALUES
(1, 'Loan Risk Score', '[{\"definition\":\"Very high credit risk\",\"from\":51,\"to\":60,\"value\":\"5\",\"monthly_interest_rate\":2.10},{\"definition\":\"High credit risk\",\"from\":61,\"to\":70,\"value\":\"4\",\"monthly_interest_rate\":2.00},{\"definition\":\"Moderate credit risk\",\"from\":71,\"to\":80,\"value\":\"3\",\"monthly_interest_rate\":1.50},{\"definition\":\"Low credit risk\",\"from\":81,\"to\":89,\"value\":\"2\",\"monthly_interest_rate\":1.20},{\"definition\":\"Very low credit risk\",\"from\":90,\"to\":100,\"value\":\"1\",\"monthly_interest_rate\":1}]', '[{\"category\":\"Capacity to pay and Capital\",\"criteria\":[{\"id\":1,\"description\":\"Net of Cash Flow\",\"scoring\":[{\"label\":\"More than sufficient\",\"score\":10},{\"label\":\"sufficient\",\"score\":5},{\"label\":\"deficit\",\"score\":1}]},{\"id\":2,\"description\":\"Deb Service Ratio\",\"scoring\":[{\"label\":\"More than sufficient\",\"score\":10},{\"label\":\"sufficient\",\"score\":5},{\"label\":\"deficit\",\"score\":1}]},{\"id\":3,\"description\":\"Repayment History\",\"scoring\":[{\"label\":\"Good\",\"score\":3},{\"label\":\"Delinquent\",\"score\":2},{\"label\":\"Past Due\",\"score\":1}]}]},{\"category\":\"Character and Management Quality\",\"criteria\":[{\"id\":4,\"description\":\"Credit reputation\",\"scoring\":[{\"label\":\"Good\",\"score\":6},{\"label\":\"Delinquent\",\"score\":3},{\"label\":\"Past Due\",\"score\":1}]},{\"id\":5,\"description\":\"Community Relations\",\"scoring\":[{\"label\":\"Peaceful & Trusting\",\"score\":6},{\"label\":\"Confronts & Suspicious\",\"score\":3},{\"label\":\"Difficult to Handle\",\"score\":1}]},{\"id\":6,\"description\":\"Physical & Mental Health Impression\",\"scoring\":[{\"label\":\"Very Good\",\"score\":6},{\"label\":\"Good\",\"score\":3},{\"label\":\"Sickly\",\"score\":1}]},{\"id\":7,\"description\":\"Quality of Family Life\",\"scoring\":[{\"label\":\"Orderly & Simple\",\"score\":6},{\"label\":\"Normal Stability\",\"score\":3},{\"label\":\"Unstable; Disorderly\",\"score\":1}]},{\"id\":8,\"description\":\"Quality of Family Life\",\"scoring\":[{\"label\":\"Orderly & Simple\",\"score\":6},{\"label\":\"Normal Stability\",\"score\":3},{\"label\":\"Unstable; Disorderly\",\"score\":1}]},{\"id\":9,\"description\":\"Impression during Interview\",\"scoring\":[{\"label\":\"Positive & helpful\",\"score\":6},{\"label\":\"Unsure & hesitant\",\"score\":3},{\"label\":\"Negative & Evasive\",\"score\":1}]},{\"id\":10,\"description\":\"Competence with livelihood\",\"scoring\":[{\"label\":\"High\",\"score\":5},{\"label\":\"Normal\",\"score\":3},{\"label\":\"Low\",\"score\":1}]}]},{\"category\":\"Condition\",\"criteria\":[{\"id\":11,\"description\":\"Successor to continue livelihood\",\"scoring\":[{\"label\":\"Available\",\"score\":5},{\"label\":\"For training\",\"score\":3},{\"label\":\"none\",\"score\":1}]},{\"id\":12,\"description\":\"Impact of competition\",\"scoring\":[{\"label\":\"Low effect\",\"score\":5},{\"label\":\"Medium\",\"score\":3},{\"label\":\"High effect\",\"score\":1}]},{\"id\":13,\"description\":\"Impact of any new regulation\",\"scoring\":[{\"label\":\"Low effect\",\"score\":5},{\"label\":\"Medium\",\"score\":3},{\"label\":\"High effect\",\"score\":1}]}]},{\"category\":\"Collateral\",\"criteria\":[{\"id\":14,\"description\":\"Back-up resources for repayments\",\"scoring\":[{\"label\":\"Strong\",\"score\":15},{\"label\":\"Medium\",\"score\":10},{\"label\":\"Weak\",\"score\":5}]}]}]', '2025-02-22 02:15:04', '2025-02-22 02:15:04'),
(3, 'Dsadasd', '[{\"definition\":\"Dsadas\",\"from\":\"1\",\"to\":\"5\",\"value\":\"2\",\"monthly_interest_rate\":\"1.2\"},{\"definition\":\"Dsadas\",\"from\":\"2\",\"to\":\"3\",\"value\":\"3\",\"monthly_interest_rate\":\"1.6\"}]', '[{\"category\":\"FAMILIY 2\",\"criteria\":[{\"id\":4,\"description\":\"Asdasd\",\"scoring\":[{\"label\":\"Xzczxcxzc\",\"score\":4},{\"label\":\"Asdas\",\"score\":1}]}]},{\"category\":\"FAMILIY\",\"criteria\":[{\"id\":5,\"description\":\"Dsadas\",\"scoring\":[{\"label\":\"Dsadasd\",\"score\":2},{\"label\":\"Dasdasd\",\"score\":1},{\"label\":\"Sadasd\",\"score\":3}]}]},{\"category\":\"FAMILIY 5\",\"criteria\":[{\"id\":9,\"description\":\"Dasdas\",\"scoring\":[{\"label\":\"Gfdghfgj\",\"score\":2}]}]}]', '2025-09-07 04:43:44', '2025-09-07 04:43:44'),
(4, 'Test 2', '[{\"definition\":\"Dsadas\",\"from\":\"1\",\"to\":\"5\",\"value\":\"1\",\"monthly_interest_rate\":\"1\"}]', '[{\"category\":\"Asdasd\",\"criteria\":[{\"id\":1,\"description\":\"Dasdasd\",\"scoring\":[{\"label\":\"Dasdad\",\"score\":200},{\"label\":\"Bbxcvcv\",\"score\":100}]}]}]', '2025-09-07 05:44:15', '2025-09-07 05:44:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL DEFAULT '0',
  `fname` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `admin_id`, `fname`, `lname`, `email`, `email_verified_at`, `password`, `role`, `address`, `contact_number`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 0, 'Admin', '', 'admin@loanapp.com', '2025-02-22 06:11:30', '$2y$10$IiugWYOhTDoXySdhw55lHuSZULaCQPxLyxEMibLLF47uLV93PExXC', 'admin', 'Cebu, Philippines', '951 123 3333', 1, NULL, '2025-02-22 02:11:19', '2025-02-22 05:04:16'),
(13, 1, 'Borrower', '2', 'asdasd@asdasd.com', NULL, '$2y$10$Bj1zF9AAOIAWsrNlgFFl0.IH15zq1cnc96m9Hoic6wxBScRVGWlz2', 'user', 'asdasd', '123 123 1213', 0, NULL, '2025-04-04 07:46:14', '2025-08-10 08:55:27'),
(12, 1, 'Borrower', '1', 'laurence.romero64@gmail.com', NULL, '$2y$10$qPZbI9MjSkocfP7mGpcvvuzJO7I0OjF8PiMs4ZzUcte0O434AcEUO', 'user', 'Brgy. Eastern, Hilongos, Leyte', '912 312 31', 0, NULL, '2025-04-04 07:45:32', '2025-08-10 08:55:24'),
(14, 1, 'Borrower', '3', 'laurence.romero64@asdasd.sdc', NULL, '$2y$10$Y064C/9dpfX9n0.YV/weGuK5GDixttFbcVqcc1QivWwVYYYzFthyu', 'user', 'Brgy. Eastern, Hilongos, Leyte', '123 121 3123', 0, NULL, '2025-04-04 07:46:48', '2025-08-10 08:55:32'),
(15, 1, 'Borrower', '4', 'laurence.romero64@asdasdasd.sdcs', NULL, '$2y$10$uz202giIjdzfLKt.IZBkueylJuAoXNBj1pqueQJ91ulVygfexmg1q', 'user', 'Brgy. Eastern, Hilongos, Leyte', '123 123 1123', 0, NULL, '2025-04-04 07:47:11', '2025-08-10 08:55:36'),
(16, 1, 'Borrower', '5', 'sdsfdsfsdfsd@asd.com', NULL, '$2y$10$wINfXOYlbXrcwN.aAovXce8EEMURCb0yLgErxUXkw7AUZDgOuaPGq', 'user', 'BRGY. TALAMBAN, CEBU', '123 121 3121', 0, NULL, '2025-04-04 07:48:05', '2025-08-10 08:55:41'),
(17, 1, 'Borrower', '6', 'asdasdasdqw.cxom@asdasdf.v', NULL, '$2y$10$4zQhRKp1EvBOT0TvreQO3eqmncbUCtBhAie3zvyF97F78CqadOj96', 'user', 'BRGY. TALAMBAN, CEBU', '123 121 3213', 0, NULL, '2025-04-04 07:48:40', '2025-08-10 08:55:45'),
(18, 1, 'Borrower', '7', 'laurence.romero64@asdasd.asdcvsd', NULL, '$2y$10$rbGrxqWNO924PWJLm5lJ9.Hg3YYdSVQdJz0oiNxRjaQJBi6N/8RG.', 'user', 'Brgy. Eastern, Hilongos, Leyte', '123 213 123', 0, NULL, '2025-04-04 07:49:14', '2025-08-10 08:55:48'),
(19, 1, 'Borrower', '8', 'asdasdascawec@sdfsdf.com', NULL, '$2y$10$IrO5N2THwZVHHxkgfrZ3OO6EnzZXIPbfRm20UMvaZXv.H4DdBmury', 'user', 'asdasd', '123 123 1231', 0, NULL, '2025-04-04 07:49:37', '2025-08-10 08:55:53'),
(20, 24, 'Borrower', '9', 'asdascac@adsfsdf.comasda', NULL, '$2y$10$ndot2.HQ9UJrR824TWIBi.Tiori4c.RrVovmWc/4MihaLvSABep1i', 'user', 'asdasd', '123 121 3123', 1, NULL, '2025-04-04 07:49:58', '2025-04-04 07:49:58'),
(21, 1, 'Borrower', '10', 'laurence.romero64@ga.cosdasdm', NULL, '$2y$10$tzORrue/22VX1tlI84IBu.lU8Y/2szS6GbFsNvL5uedc8ZZcUmzRi', 'user', 'Cebu City', '123 234 5325', 1, NULL, '2025-04-04 07:50:20', '2025-04-04 21:47:54'),
(22, 1, 'Jose Laurence', 'Romero', 'akocslash@gmail.com', NULL, '$2y$10$hlPtRJ8wxlN11w1BCeva..MXjKqdzKC1U0FQbbTkktvKKHaRvKZuO', 'user', 'Cebu City', '910 520 4075', 1, NULL, '2025-04-04 21:36:10', '2025-08-10 10:18:56'),
(23, 1, 'Borrower', '11', 'qweqwe@asdasd.com', NULL, '$2y$10$2VQxij1o9aGdBEgnM2zCX.xtPpowRuirnOvFZrs3gmFva4slU6uw.', 'user', 'Brgy. Talamban, Cebu City', '912 121 2121', 1, NULL, '2025-04-06 04:27:31', '2025-08-10 10:18:50'),
(24, 0, 'Chyrell', 'Branzuela', 'admin@loanapp.net', '2025-04-04 16:00:00', '$2y$10$IiugWYOhTDoXySdhw55lHuSZULaCQPxLyxEMibLLF47uLV93PExXC', 'admin', 'Brgy. Talamban, Cebu City', '912 121 2121', 1, NULL, '2025-04-07 02:31:17', '2025-04-07 02:31:17'),
(25, 24, 'Clyde', 'guerrero', 'admin@loanapp.org', NULL, '$2y$10$1as3pqg/mtqhS0L7uB9L6OCxNBQvCR1yq/BZzZVP9Ds55M7GftAzu', 'user', 'Brgy. Talamban, Cebu City', '912 121 2121', 1, NULL, '2025-04-07 02:31:52', '2025-04-07 02:31:52'),
(26, 1, 'under admin', 'admin', 'test123@gmail.com', '2025-09-11 12:26:04', '$2y$10$/ciDo3Cmaj5YKBpweDfnEOtIemnSWJPQ/dMOHvC2XfueTYcNLJOGG', 'user', 'cebu', '111 111 1111', 1, NULL, '2025-09-11 12:26:04', '2025-09-11 12:26:04'),
(27, 24, 'under Chyrell', 'Admin', 'test123123@gmail.com', '2025-09-11 12:27:18', '$2y$10$6W0Mp09wiLehtdJoLzrxsuNE6EiluzotXVwOGjOtlcEyUmqSnndIy', 'user', 'ormoc', '971 242 4444', 1, NULL, '2025-09-11 12:27:18', '2025-09-11 12:27:18');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
