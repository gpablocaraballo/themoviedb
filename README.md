# themoviedb
React App demo/challenge using themoviedb.org endpoint

#INSTRUCTIONS


#STEPS

# 1 . Clone the github repo
git clone https://github.com/developergit001/themoviedb.git

# 2 . Enter inside the directory app
cd themoviedb

# 3 . Install the dependencies
npm install

# 4 . start the app
npm start


# OTHERS - COMMENTS - FAQS

# TESTING: You can try some testing stuff using jest, simple run -> npm test
# TESTING files: Inside src/__testing__/all.test.js 

# PAGINATION: For this challenge, pagination is not mandatory, but be aware that in a real final app, themoviedb endpoint is using page numbers

# react hooks: In this challenge i use react hooks, i just use it to learn some new features in react apps
# state container: I used react context api i tried to divide some basics components but that they keep communicating between them.
# on the main componentes the state components with the main logic are: search (for movies filter), stars (for local rating filter) , list (for movies) and a modal component, when you choose a movie and want to see more detail.

#FAQS:
Q. ¿Man, you put your themoviedb personal app ke, why?
A. Dont worry, i change it later (its better for the demo).

Q. ¿Why dont use pagination?, themoviedb is using it.
A. Well, i know, but for this challenge was not mandatory (but yes, in a real case, you must develop pagination 
because themoviedb only work with pages, they dont response a super big json when you exec a ajax request ).

Q. ¿Any comment?
A. I tried to put best practices and use cool stuff like react hooks, in 2-3 days i think its a good and simple challenge :)
   Always you can improve your code of course.
