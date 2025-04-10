INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (1, true,'2001-02-09','Tim Silver','CEO');

INSERT INTO `direct_reports` (`manager_id`, `employee_id`)
VALUES (1,2), (1,3), (1,4);

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (2, false,'2009-10-12','Liz Brown','CFO');

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (3, true,'2011-12-10','Rob Red','CTO');

INSERT INTO `direct_reports` (`manager_id`, `employee_id`)
VALUES (3,53), (3,89);

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (4, true,'2019-01-05','Jeff Pink','CPO');

INSERT INTO `direct_reports` (`manager_id`, `employee_id`)
VALUES (4,97);

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (5, false,'2014-10-12','Alex Purple','Accountant');

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (24, true,'2018-10-12','John Beige','Accountant');

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (53, true,'2016-11-06','Seth Green','Engineer');

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (89, true,'2017-04-04','Jennifer Orange','Engineer');

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (97, true,'2017-05-09','Tina Yellow','HR');

INSERT INTO `employees` (`id`, `active`, `hire_date`, `name`, `position`)
VALUES (129, true,'2019-10-12','Amanda Teal','Accountant');



