# License: MIT
# Dynamic CGI serving using dynamic path imports for 
#          CGI supporting executable for Interpreted languages Embedded Distribution
# Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 


use CGI;
$query = new CGI;
print $query->h3('This is a headline.');
print $query->p('This is body text.');
print $query->p('Perl PL Version of the page');
