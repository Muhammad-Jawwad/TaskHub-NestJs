import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";
import { TeamMembers } from "./TeamMembers";

@Entity({ name: 'teams' })
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    team_name: string;

    @CreateDateColumn()
    created_at: Date; 

    @UpdateDateColumn()
    updated_at: Date;

    // Foreign Keys
    @OneToOne(() => User, {
        eager: true,
    })
    @JoinColumn({ name: 'team_lead' })
    team_lead: User;

    // Relations
    @OneToOne(() => TeamMembers, (team_member) => team_member.team_id)
    team_members: TeamMembers[];
}