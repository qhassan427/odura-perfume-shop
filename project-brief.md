Course: Web Programming Course Code: CS4032
Program: BS Cyber Security Semester: Fall 2026
Assignment: 02 Total Marks: 100
Mode: Individual Due Date: Announced on Google Classroom

Instructions /
Notes

Submit on Google Classroom before the deadline. Submit a PDF report, public GitHub link,
deployed website link, and source-code ZIP. A 10-minute individual viva will be conducted.
Read the submission and academic-integrity policies at the end of this brief.

Assignment 02
Business Website Development Using React
Assignment Instructions
Identify three frontend design or interaction problems in existing business websites. Build and deploy a React
website for your own fictional business in the same domain, with features that address all three problems.
For example, you may study restaurant websites and build a website for your own restaurant. Give your business its
own name, content, appearance, and implementation.
Your work should show a complete React application, sound use of JavaScript, HTML and CSS, clear design choices,
and a working GitHub repository and deployment. You will explain your work in an individual viva.
Task 1: Select a Domain and Investigate Three Problems
1.1 Choose a suitable domain
Choose a business that allows users to complete the following journey:
1. Browse products, services, events, sessions, or similar records.
2. Search and narrow down the options.
3. Open a details page.
4. Build and change a selection.
5. Complete a relevant form.
6. Review a calculated summary.
7. Reach a confirmation or clear final result.
Domain Example application
Restaurant Menu browsing, item customization, cart, and order review
Retail Product browsing, details, cart, and simulated checkout
Museum or attraction Exhibitions, visit planning, and simulated ticket booking
Events Event browsing, ticket selection, and registration
Fitness or training Class browsing, session selection, and booking
Travel or experiences Activity browsing, option selection, and reservation
Other domains are suitable if they support the full journey above. Adding a contact form to an otherwise
informational website is insufficient.

CS4032 | Assignment 02 | Islamabad Campus Page 2
Business Website Development Using React Fall 2026
1.2 Select reference websites
Try to use one publicly accessible website. You may use multiple websites in the same business domain where
needed.
Use these websites as evidence of problems. Develop your own website rather than copying their branding, layouts,
and assets.
1.3 Identify three different problems
Each problem must affect a task that matters to a user and have a reasonable connection to a business goal.
Example problem Possible effect on the business
Listings leave out
information needed to
compare options

Customers struggle to find suitable products or services

Charges or restrictions
appear late

Customers encounter unexpected conditions and may leave

Form errors are unclear or
valid input is cleared

Customers repeat work or fail to finish

Navigation resets filters or
selections

Customers lose their place and progress

Empty results offer no way
forward

Customers cannot find available alternatives

Important controls are
difficult to use on mobile

Customers struggle to complete the task

Availability is shown too
late

Customers spend time on an option they cannot select

The three problems must be different. Three examples of the same underlying issue count as one problem.
A visual problem must affect reading, understanding, finding information, or completing a task. Personal preferences
about colours, fonts, or decoration are insufficient.
1.4 Provide evidence
For each problem, include:
• The reference website URL.
• A screenshot of the relevant interface.
• The task the user is trying to complete.
• What goes wrong or makes the task difficult.
• The possible business consequence.
• How your website will address it.
Add numbered steps and further screenshots if the behaviour cannot be shown in one image. Clearly separate what
you observed from what you think its consequences may be. Support claims with evidence rather than invented sales
figures or customer statistics.

CS4032 | Assignment 02 | Islamabad Campus Page 3
Business Website Development Using React Fall 2026
Task 2: Define Your Business
2.1 Business profile
Create a business in the same domain as your reference websites. Define the following:
Element Required detail
Business identity Name and specific products or services
Primary audience A clearly identified customer group
Operating area City, region, delivery area, physical location, or defined online service area
Main customer task What customers should be able to do
Business goal The completed action the website should support
Offering At least 10 relevant products, services, events, sessions, or other selectable records
These details must guide your implementation. For example:
A meal-preparation business serving university students in Islamabad, offering individual meals and weekly
bundles for collection or delivery within selected areas.
This example defines the audience, offering, location, and delivery model. Those choices should affect the content,
information shown, controls, and order process.
2.2 Three operating rules
Define one rule from each category below.
Category Examples
Availability or capacity Stock limits, remaining seats, collection slots, maximum group size
Eligibility or compatibility Prerequisites, dietary suitability, age restrictions, supported equipment
Pricing or fulfilment Minimum order value, delivery charges, service areas, group pricing, booking cutoffs
For each rule, state:
1. The exact condition.
2. Where the user is told about it.
3. What the application does when the condition is met or broken.
4. One boundary case and the expected result.
At least one rule must include a numerical limit. For example:
A booking accepts one to six attendees. The limit appears beside the quantity control. A quantity outside this
range prevents confirmation and shows a specific message.
Each rule must change how the application works. Use local data and React state to apply it.
Task 3: Record Three Frontend Decisions
Record one important decision for each investigated problem in DECISIONS.md.

CS4032 | Assignment 02 | Islamabad Campus Page 4
Business Website Development Using React Fall 2026

Field Required content
Problem The reference-site problem being addressed
Decision The behaviour or structure you chose
Alternative One other reasonable approach
Reason Why your choice fits the customer task and business
Tradeoff What your choice makes less convenient or more complex
Code location Relevant file and component or function
Evidence Screenshot and brief steps showing the improvement
At least one decision must concern interaction or state behaviour. At least one must concern information
hierarchy or mobile layout.
For example, you may keep selected products when filters hide them and show which selections are hidden. This
helps customers compare products across categories, but needs clear feedback to avoid confusion.
Keep the entries short and specific. Be prepared to explain all three decisions in the viva.
Task 4: Develop the React Application
Build a connected frontend. Users must be able to start a task, make choices, correct mistakes, and reach a clear result.
Functional Requirements
ID Requirement Expected behaviour
FR01 Navigation At least three meaningful routes using react-router-dom; navigation and browser

Back/Forward work

FR02 Details route A parameterized route such as /items/:id; invalid IDs show useful feedback
FR03 Local data At least 10 relevant records from JavaScript or JSON data, each with a stable ID
FR04 Search Search relevant text fields and update the results
FR05 Filter and sort At least one useful filter and one sorting control; both work with search
FR06 Details view Information needed to choose an item, including relevant prices, conditions, or

availability

FR07 Selection Add and remove records from a cart, shortlist, schedule, or plan; change quantities

or options where relevant

FR08 Shared state Changes stay consistent across listings, details, selections, and summaries
FR09 Controlled form At least three relevant user-editable fields within the main journey
FR10 Validation At least three meaningful rules, specific feedback, and valid input preserved where

appropriate

FR11 Calculated summary Useful values such as count, total price, duration, fees, or capacity
FR12 Business rules All three rules work and prevent invalid completion
FR13 Persistence Save a useful selection or preference in local storage and restore it correctly
FR14 Loading and errors Load local data through an asynchronous mock loader; show loading, failure, and

retry states

FR15 Empty states Distinguish an empty dataset from a search/filter with no matches; provide useful

guidance

FR16 Completion A clear confirmation or final summary at the end of the journey

CS4032 | Assignment 02 | Islamabad Campus Page 5
Business Website Development Using React Fall 2026

ID Requirement Expected behaviour
FR17 Responsive access Main journey works at 390 px and 1280 px widths and using the keyboard
FR18 Improvements All three investigated problems are addressed in the working application
FR19 Deployment Public application with working assets, navigation, and nested-route refresh
The form must belong to the main journey. Each route must serve a useful purpose.
React and JavaScript Requirements
Topic Required use
Components and modules Meaningful function components in suitable files, using imports and exports
JSX Valid JSX, expressions, and suitable HTML elements
Props Pass data to child components
Callback props Send actions to the component responsible for updating state
Events React event handlers; prevent default form submission where appropriate
State useState for changing data and controlled input values
Functional updates Use where the next state depends on the previous state
Objects Update form data or record properties without mutating state
Arrays Add, remove, and update selections without mutating state
Lists and keys Render records using stable identifiers
Conditional rendering Availability, validation, loading, error, and empty states
Shared state Keep a consistent source of data for related components
Derived values Calculate summaries from current data
Effects useEffect for suitable external synchronization
Dependencies and cleanup Correct dependencies and cleanup where the effect needs it
Data handling Array methods, spread syntax, destructuring, and conditions used for real logic
Asynchronous code Promises with async/await or .then(), including failure handling
Browser storage Read and write useful data using local storage
Routing Routes, URL parameters, links, and navigation
Use React state and rendering to control application content.
Structure and code quality
Use suitable folders for components, pages, local data, assets, styles, mock loading logic, and business-rule functions
and tests. Use meaningful names, consistent formatting, and brief comments where reasoning needs explanation.
Application scope
Use local data and simulated orders, bookings, registrations, or submissions. Clearly label simulated operations. The
required scope is a frontend application. Keep payment details fictional and exclude credentials and personal
information from submitted data.
Task 5: Visual Design, Accessibility, and Responsiveness
Give your website a consistent appearance that fits its business and audience. Design will be assessed through the
finished application. Show:

CS4032 | Assignment 02 | Islamabad Campus Page 6
Business Website Development Using React Fall 2026
• Clear information hierarchy.
• An identifiable primary action on important screens.
• Consistent typography, spacing, and colour roles.
• A distinction between primary and secondary actions.
• Clear selected, unavailable, error, and success states.
• A suitable layout on mobile.
Add brief annotations to final screenshots to explain important choices.
Accessibility requirements
Provide:
• Semantic HTML and a logical heading structure.
• Labels associated with inputs.
• Buttons for actions and links for navigation.
• Keyboard access to core interactions.
• Visible focus states.
• Useful alternative text for meaningful images.
• Text alongside important status colours.
• Readable content and usable controls.
• Layouts without unintended page-wide horizontal overflow.
Use authored CSS, including CSS Modules if preferred. Ready-made website templates, complete prebuilt page
layouts, and UI component kits are prohibited. Routing and icon libraries are permitted.
Use original or appropriately licensed assets. Prepare realistic content that supports your business profile and rules.
Task 6: Check Edge Cases and Test One Business Rule
6.1 Manual checks
Check and repair the following:
Case Required handling
Missing or lengthy content Keep the layout usable and show clear fallbacks for missing images or information
Empty results or invalid
URL

Explain the situation and provide a useful next action

Invalid form input Show specific feedback and preserve other valid input where appropriate
Unavailable or restored
selection

Check selections against current data and rules, explain conflicts, and allow correction

Loading failure Show a clear error and provide a working retry
Provide a documented setting or clearly labelled demonstration control for loading failure and changed availability.
For each investigated improvement, record user actions, expected behaviour, and observed behaviour. Use a
concise checklist and relevant screenshots.
Check the complete application in the latest Chrome or Edge with the console open. Resolve application errors and
React warnings.
Marking distinction: business-rule marks assess normal enforcement and boundary inputs. Edge-case marks assess
recovery when existing selections or saved data become invalid. The same behaviour will not be marked twice.
6.2 Automated business-rule test
Test one operating rule using Node.js's built-in test runner.
1. Put the selected rule in a separate JavaScript module and export its function.

CS4032 | Assignment 02 | Islamabad Campus Page 7
Business Website Development Using React Fall 2026
2. Use that function in your React application.
3. Create one test file using node:test and node:assert/strict.
4. Include at least three cases: a valid input, an input exactly at the rule's limit, and an input that breaks the rule.
5. Run the tests using node --test and ensure all cases pass.
For a booking limit of one to six attendees, test an ordinary valid quantity, exactly six, and a quantity above six.
The function must return a result that can be checked independently of the interface. Test the same function used by
the application.
Use a module format supported by your project. A starter example will be provided. Include the test file in the
repository and ZIP. Document the command in the README and record the result briefly in the report.
Task 7: GitHub Development and Deployment
7.1 GitHub requirements
Create a public GitHub repository at the beginning of development and use it throughout the assignment. Your
history must show meaningful progress through:
1. Initial setup and business data.
2. Components, routes, and browsing features.
3. Selection workflow, form, and operating rules.
4. Frontend improvements and responsive styling.
5. Edge-case fixes, rule tests, documentation, and deployment preparation.
These are development milestones. Commit working increments as you progress and write messages that explain the
changes.
Include source files, dependency files, the lockfile, README.md, DECISIONS.md, and the test file. Exclude
node_modules, secrets, and generated build output. Identify the final commit hash in your submission.
Uploading the completed application only at the end does not fulfil the development-history requirement. Fabricating
or backdating repository history is prohibited.
7.2 Deployment requirements
Deploy the completed application using a suitable hosting service. Verify that:
• The public link opens without requesting access.
• Assets load correctly.
• The main journey works.
• Direct links and refreshes on nested routes work.
• The deployment matches the submitted final commit.
GitHub development and deployment are compulsory and assessed separately.

CS4032 | Assignment 02 | Islamabad Campus Page 8
Business Website Development Using React Fall 2026
Rubric
The assignment is marked out of 100: 85 marks for submitted work and 15 marks for the individual viva.
Category Marks Full-credit requirements
Functional application 20 Complete journey with navigation, discovery, details, selection, validated form,

summary, and outcome

React and JavaScript 20 Suitable components, props, callbacks, state, immutable updates, derived

values, asynchronous code, effects, and persistence

Business rules 10 Three relevant rules, clearly communicated and correctly enforced, including

boundaries

Visual design 7 Consistent identity, clear hierarchy, suitable spacing and typography, and

understandable actions and feedback

Responsiveness and
accessibility

8 Suitable mobile layout, semantic controls, keyboard access, labels, and focus
Edge cases and rule tests 7 Required recovery behaviour and meaningful automated rule verification
Investigation and decisions 7 Three different evidenced problems, plausible consequences, and justified

decisions linked to code

GitHub and documentation 3 Development history, complete README, and reproducible setup
Deployment 3 Working public application, assets, direct routes, and matching submitted source
Individual viva 15 Explains concepts and code, defends decisions, demonstrates behaviour, and

makes a small relevant change

Total 100
Within edge cases and rule tests, 5 marks assess manual handling and recovery; 2 marks assess the test file,
meaningful assertions, and three required cases. Within GitHub and documentation, 2 marks assess history and 1
mark assesses documentation and setup.
Extra features earn credit only where they improve an assessed requirement. Features described but not implemented
receive no implementation credit.
Report Contents
Submit one PDF report with the following sections in order:
Section Required evidence
Student and project details Name, roll number, section, business name, repository link, deployment link, and final commit

hash

Business profile Offering, audience, operating area, main customer task, and business goal
Operating rules Three rules, exact conditions, communication, responses, and boundary cases
Reference-site investigation URLs, screenshots, affected tasks, observed difficulties, and possible business consequences

for three problems

Frontend decisions Three entries from DECISIONS.md, including alternatives, tradeoffs, and code locations
Implemented application Relevant screenshots of the journey with short design annotations
Verification Edge-case checklist, actions/expected/observed results for improvements, and automated test

result

Limitations Known incomplete behaviour

CS4032 | Assignment 02 | Islamabad Campus Page 9
Business Website Development Using React Fall 2026
Keep the report concise and evidence-based. Use tables, screenshots, labels, and short bullet points. Include
only what is needed to understand or verify the application. Avoid essays, general definitions, unrelated background,
and repetition.
README contents
Include:
• Project title and student details.
• A short project description.
• Installation, development, build, and test commands.
• GitHub and deployment links.
• Main routes and feature summary.
• Instructions for reproducing edge cases.
• Simulated operations and known limitations.
• A short concept map: concept, file, and component/function.
Submission Guidelines
• Submit the PDF report, public GitHub repository link, deployed website link, and source-code ZIP on Google
Classroom before the announced deadline.
• Name the ZIP RollNo_Name_Section_A#02.zip, for example, 24I1234_AliAhmad_B_A#02.zip. Use underscores
between fields and remove spaces from the name.
• Include application source, local data, assets, styles, the rule test, dependency files, lockfile, README.md, and
DECISIONS.md. Exclude node_modules, build output, and secrets.
• Ensure that the report, repository, deployment, and ZIP match the same submitted application.
• A 10-minute individual viva will be conducted. Be prepared to explain important React and JavaScript concepts,
demonstrate the journey and edge cases, defend all three frontend decisions, locate relevant code, explain rules and
tests, change a constant, modify a function, and reason through a related scenario.
• Late submission and plagiarism: late submissions and plagiarized work receive zero. You must understand and
justify all submitted work.
• You must understand and justify all submitted code, regardless of its source. Viva marks depend on your
understanding of the implementation and its decisions.
• For queries, contact your TA.