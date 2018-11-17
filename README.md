
npm install --save sweetalert
ng g s services/usuario/usuario
npm install angular-2-local-storage

# Hola, Bienvenido
> Solucion
##### ERROR en la conexión de git LOCAL con git REMOTO (bitBucket)

Cuando se intenta hacer un push a un repositorio, previo la creacion de 

1. ```` $ git remote add origin git@bitbucket.org:leone2015/ecommerce-frontend.git````

2. ````$ git push -u origin master````
se puede visualizar este error 
> $ git push -u origin master
  Warning: Permanently added the RSA host key for IP address '2406:da00:ff00::22c3                                                                                                                :9b0a' to the list of known hosts.
  Permission denied (publickey).
  fatal: Could not read from remote repository.
  Please make sure you have the correct access rights
  and the repository exists.
  
Paso 1. crear una clave, ingresar en el shell del proyecto y digitar 

 ````$ ssh-keygen -t rsa -b 4096 -C "lmedinae@est.ups.edu.ec"```` 
 
 ó
 
   ````$ ssh-keygen```` [more info](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html#SetupanSSHkey-ssh1)
   
 esto creará dos archivos dentro del proyecto o del directorio que se abrio el shell
   
 Paso 2. abrir cualquiera de los dos archivos preados (.pub) y publicarlos en bitBucket 
    
    1. From Bitbucket, choose Bitbucket settings from your avatar in the lower left.The Account 
       settings page opens.  Click SSH keys.
       If you've already added keys, you'll see them on this page.
    2. Open your .ssh/id_rsa.pub file (or whatever you named the public key file) and copy its contents.
       You may see an email address on the last line. It doesn't matter whether or not you include the email address.
       From Bitbucket, click Add key.
    3. Enter a Label for your new key, for example, Default public key.
       Paste the copied public key into the SSH Key field.
Paso 3. regresar al shell y digitar 

`````$ ssh -T git@bitbucket.org `````

puede salir el siguiente mensaje:  
      
      You can use git or hg to connect to Bitbucket. Shell access is disabled.

ó 

      Permission denied (publickey)
      
Paso 4.  Permission denied (publickey) [more info](https://confluence.atlassian.com/bitbucket/troubleshoot-ssh-issues-271943403.html)

* Copiar los archivos generados en mi caso se generaron  ( leo, leo.pub) en el directorio C:\usuario\NOMBRE-USUARIO-ORDENADOR\.ssh\ 
* digitar el siguiente código
````$ ssh-add ~/.ssh/leo````
* esto solicitará la clave que se ingresó cuando se generó en el en el **Paso 1.**
* Digitar ````$ ssh -T git@bitbucket.org````

> EL RESULTADO DEBE SER EL SIGUIENTE

    logged in as leone2015.
    You can use git or hg to connect to Bitbucket. Shell access is disabled.


