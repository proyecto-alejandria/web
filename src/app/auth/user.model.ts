export const USERNAME_REGEX = /^[a-zA-Z0-9@.-]+$/;

export interface UserCard {

  id: string;

  username: string;

  first_name: string;

  last_name: string;

}

export interface UserDto extends UserCard {

  email: string;

  perms: string[];

}

export class User implements UserCard {

  id: string;

  email: string;

  username: string;

  first_name: string;

  last_name: string;

  private perms: Set<String>;

  constructor(dto: UserDto) {
    this.id = dto.id;
    this.email = dto.email;
    this.username = dto.username;
    this.first_name = dto.first_name;
    this.last_name = dto.last_name;

    this.perms = new Set<string>(dto.perms);
  }

  public hasPerm(perm: string): boolean {
    return this.perms.has(perm);
  }

}
